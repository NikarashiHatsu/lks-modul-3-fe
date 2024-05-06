<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar bg-base-100 shadow sticky top-0">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">
        Facegram
      </a>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="/images/blank.webp" class="bg-cover" />
          </div>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <!-- <RouterLink to="/register">Register</RouterLink> -->
            <!-- <RouterLink to="/login">Login</RouterLink> -->
            <a>
              Register
            </a>
          </li>
          <li>
            <a>
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>