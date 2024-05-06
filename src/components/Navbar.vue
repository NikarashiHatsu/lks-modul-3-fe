<script setup>
  import { RouterLink } from 'vue-router'
  import { useAuthStore } from '@/store/auth';;
</script>

<template>
  <header class="navbar bg-base-100 shadow sticky top-0 z-50">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">
        Facegram
      </a>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost font-normal">
          <span v-if="useAuthStore().isAuthenticated">
            {{ useAuthStore().user.full_name }}
          </span>
          <div class="w-10 rounded-full">
            <img src="/images/blank.webp" class="bg-cover rounded-full" />
          </div>
        </div>

        <ul
          v-if="! useAuthStore().isAuthenticated"
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <!-- <RouterLink to="/register">Register</RouterLink> -->
            <a>
              Register
            </a>
          </li>
          <li>
            <RouterLink :to="{ name: 'auth.login' }">Login</RouterLink>
          </li>
        </ul>

        <ul
          v-if="useAuthStore().isAuthenticated"
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <RouterLink :to="{ name: 'auth.logout' }">
              Log out
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>