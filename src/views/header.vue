<script setup>
import { RouterLink, useRoute } from 'vue-router';
import router from '../router';
import { useUsers } from '@/stores/auth'
import Swal from 'sweetalert2'

const currentUser = localStorage.getItem('token') !== null;

const path = useRoute().path;

const submitlogout = () => {
    if (localStorage.getItem('token') !== null) {
        const users = useUsers();
        users.singoutUser()
            .then(() => {
                Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                }).fire({
                    icon: 'success',
                    title: 'خارج شدید'
                })
                router.push({ path: '/login' })
            })
            .catch((error) =>
                Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                }).fire({
                    icon: 'error',
                    title: error
                })
            );
    }
};
</script>
<template>
    <header dir="rtl">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">

                            <RouterLink v-if="path !== '/register' && !currentUser"
                                :class="path == '/register' ? 'active' : ''" class="nav-link" aria-current="page"
                                to="/register">ثبت نام</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink v-if="path !== '/login' && !currentUser" :class="path == '/login' ? 'active' : ''"
                                class="nav-link" aria-current="page" to="/login">ورود</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink v-if="path !== '/dashboard' && currentUser" class="nav-link" aria-current="page"
                                to="/dashboard">
                                داشبورت</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink v-if="path !== '/'" class="nav-link" aria-current="page" to="/">
                                صفحه اصلی</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink v-if="currentUser" :class="path == '/dashboard' ? 'active' : ''" class="nav-link"
                                aria-current="page" @click="submitlogout" to="/login">خروج</RouterLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    </header>
</template>
<style lang="css">
@import 'bootstrap';
</style>