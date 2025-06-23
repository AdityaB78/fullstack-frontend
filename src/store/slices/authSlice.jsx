import { createSlice, createAsyncThunk, isPending, isRejected } from '@reduxjs/toolkit';
import { login, register, getProfile } from '../../services/api';

// LOGIN
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { token } = await login(email, password);
    localStorage.setItem('token', token);
    const user = await getProfile();
    return { user , token };
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Login failed');
  }
});

// REGISTER
export const registerUser = createAsyncThunk('auth/register', async ({ name, email, password, isHost }, { rejectWithValue }) => {
  try {
    const { token } = await register(name, email, password, isHost);
    localStorage.setItem('token', token);
    const user = await getProfile();
    return { user, token };
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Registration failed');
  }
});

// FETCH ON PAGE RELOAD
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const user = await getProfile();
    return user;
  } catch (err) {
    localStorage.removeItem('token');
    return rejectWithValue(err.response?.data?.error || 'Session expired or invalid token');
  }
});

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  hydrated: false, // marks auth state initialization complete
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.hydrated = true;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN fulfilled
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.hydrated = true;
      })

      // REGISTER fulfilled
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.hydrated = true;
      })

      // FETCH PROFILE fulfilled
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.hydrated = true;
      })

      // Any pending request
      .addMatcher(isPending(loginUser, registerUser, fetchUser), (state) => {
        state.loading = true;
        state.error = null;
      })

      // Any rejected request
      .addMatcher(isRejected(loginUser, registerUser, fetchUser), (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.hydrated = true;
      })

      // Any fulfilled request
      .addMatcher(
        (action) =>
          [loginUser.fulfilled.type, registerUser.fulfilled.type, fetchUser.fulfilled.type].includes(action.type),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
