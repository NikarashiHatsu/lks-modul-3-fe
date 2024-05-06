<script setup>
  import { ref } from 'vue';
  import app from '@/config/app';
  import axios from 'axios';
  import { useAuthStore } from '@/store/auth.js';

  const isLoading = ref(false);

  const form = ref({
    message: '',
    user: {
      username: {
        value: '',
        error: '',
      },
      password: {
        value: '',
        error: '',
      },
    },
    resetError() {
      this.message = '';
      this.user.username.error = '';
      this.user.password.error = '';
    },
    resetUser() {
      this.user.username.value = '';
      this.user.password.value = '';
    }
  });

  const login = async () => {
    isLoading.value = true;

    form.errorMessage = '';

    await axios.post(
        `${app.apiUrl}/api/v1/auth/login`,
        {
          username: form.value.user.username.value,
          password: form.value.user.password.value,
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(async (response) => {
        const { token, user } = response.data;

        useAuthStore().setCredentials(token, user);

        window.location.href = '/';
      })
      .catch((error) => {
        const responseCode = error.response?.status;

        if (responseCode == 401) {
          form.value.message = error.response.data.message;
        }
      });

    isLoading.value = false;
  }
</script>

<template>
  <div class="max-w-sm w-full mx-auto">
    <div class="card bg-base-100 border">
      <div class="card-body">
        <div
          class="alert alert-error mb-4"
          v-if="form.message != ''"
        >
          {{ form.message }}
        </div>

        <div class="h5 text-lg font-semibold">
          Login
        </div>

        <form @submit.prevent="login">
          <div class="form-control mb-4">
            <label for="username" class="label">
              <span class="label-text">
                Username
                <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.user.username.value"
              type="text"
              name="username"
              id="username"
              class="input input-bordered w-full"
              :class="{ 'input-disabled': isLoading }"
              required
            />
          </div>

          <div class="form-control mb-6">
            <label for="password" class="label">
              <span class="label-text">
                Password
                <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.user.password.value"
              type="password"
              name="password"
              id="password"
              class="input input-bordered w-full"
              :class="{ 'input-disabled': isLoading }"
              required
            />
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="btn btn-primary"
              :class="{ 'btn-disabled': isLoading }"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>