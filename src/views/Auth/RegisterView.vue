<script setup>
  import { ref } from 'vue';
  import app from '@/config/app';
  import axios from 'axios';
  import { useAuthStore } from '@/store/auth.js';

  const isLoading = ref(false);

  const form = ref({
    message: '',
    user: {
      full_name: {
        value: '',
        error: '',
      },
      bio: {
        value: '',
        error: '',
      },
      username: {
        value: '',
        error: '',
      },
      password: {
        value: '',
        error: '',
      },
      password_confirmation: {
        value: '',
        error: '',
      },
      is_private: {
        value: false,
        error: '',
      },
    },
    resetError() {
      this.message = '';
      this.user.full_name.message = '';
      this.user.bio.message = '';
      this.user.username.message = '';
      this.user.password.message = '';
      this.user.password_confirmation.message = '';
      this.user.is_private.message = '';
    },
    resetUser() {
      this.user.full_name.value = '';
      this.user.bio.value = '';
      this.user.username.value = '';
      this.user.password.value = '';
      this.user.password_confirmation.value = '';
      this.user.is_private.value = '';
    }
  });

  const register = async () => {
    isLoading.value = true;

    form.resetError;

    await axios.post(
        `${app.apiUrl}/api/v1/auth/register`,
        {
          full_name: form.value.user.full_name.value,
          bio: form.value.user.bio.value,
          username: form.value.user.username.value,
          password: form.value.user.password.value,
          password_confirmation: form.value.user.password_confirmation.value,
          is_private: form.value.user.is_private.value,
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

        if (responseCode == 422) {
          form.value.message = error.response.data.message;

          form.value.user.full_name.error = error.response.data.errors?.full_name;
          form.value.user.bio.error = error.response.data.errors?.bio?.[0];
          form.value.user.username.error = error.response.data.errors?.username?.[0];
          form.value.user.password.error = error.response.data.errors?.password?.[0];
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
          Register
        </div>

        <form @submit.prevent="register">
          <div class="form-control mb-4">
            <label for="full_name" class="label">
              <span class="label-text">
                Full Name
                <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.user.full_name.value"
              type="text"
              name="full_name"
              id="full_name"
              class="input input-bordered w-full"
              :class="{ 'input-disabled': isLoading }"
              required
            />
            <div :x-if="form.user.full_name.error != ''">
              <p class="text-xs text-red-500 mt-2">
                {{ form.user.full_name.error }}
              </p>
            </div>
          </div>

          <div class="form-control mb-4">
            <label for="bio" class="label">
              <span class="label-text">
                Bio
                <span class="text-red-500">*</span>
              </span>
            </label>
            <textarea
              v-model="form.user.bio.value"
              type="text"
              name="bio"
              id="bio"
              class="textarea textarea-bordered w-full"
              rows="3"
              :class="{ 'textarea-disabled': isLoading }"
              required
            ></textarea>
            <div :x-if="form.user.bio.error != ''">
              <p class="text-xs text-red-500 mt-2">
                {{ form.user.bio.error }}
              </p>
            </div>
          </div>

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
            <div :x-if="form.user.username.error != ''">
              <p class="text-xs text-red-500 mt-2">
                {{ form.user.username.error }}
              </p>
            </div>
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
            <div :x-if="form.user.password.error != ''">
              <p class="text-xs text-red-500 mt-2">
                {{ form.user.password.error }}
              </p>
            </div>
          </div>

          <div class="form-control mb-6">
            <label for="password_confirmation" class="label">
              <span class="label-text">
                Password Confirmation
                <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.user.password_confirmation.value"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              class="input input-bordered w-full"
              :class="{ 'input-disabled': isLoading }"
              required
            />
          </div>

          <div class="form-control mb-6">
            <label for="is_private" class="label cursor-pointer justify-start">
              <input
                v-model="form.user.is_private.value"
                type="checkbox"
                name="is_private"
                id="is_private"
                checked="checked"
                class="checkbox checkbox-primary"
                :class="{ 'checkbox-disabled': isLoading }"
                :value="true"
              />
              <span class="label-text ml-4">
                Is private?
              </span>
            </label>
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