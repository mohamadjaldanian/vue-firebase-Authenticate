<script setup>
import { ref } from 'vue';
import { useUsers } from '@/stores/auth'
import Header from './header.vue';
import router from '../router';
import Swal from 'sweetalert2'

const users = useUsers();
const email = ref('');
const password = ref('');
const validateEmail = ref('');
const validatePassword = ref('');
const loding = ref('');
const emailValidate = () => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.value == '') {
    validateEmail.value = '';
  }
  else if (email.value !== '' && re.test(email.value) == true) {
    validateEmail.value = 'is-valid';

  }
  else {
    validateEmail.value = 'is-invalid';
    email.value = '';
  }

}

const passwordValidate = () => {

  var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (password.value == '') {
    validatePassword.value = '';
  }
  else if (password.value !== '' && regex.test(password.value) == true) {
    validatePassword.value = 'is-valid';

  }
  else {
    validatePassword.value = 'is-invalid';
    password.value = '';
  }

}

const submitLogin = () => {

  if (email.value == '' && password.value == '') {
    validateEmail.value = 'is-invalid';
    validatePassword.value = 'is-invalid';
  }
  else {
    loding.value = true
    users.loginUser(email.value, password.value)
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
          title: 'وارد شدید'
        })
        loding.value = false,
          router.push({ path: '/dashboard' })
      })
      .catch((error) => {
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
          title: error,
        })
        loding.value = false
      });
  }
}
</script>

<template>
  <Header></Header>
  <section class="container mt-5 " dir="rtl">
    <div class="row justify-content-md-center">
      <div class="col-6 card">
        <div class="card-body">
          <h1>ورود</h1>
          <form class="mt-2" @submit.prevent="submitLogin">
            <div class="col text-end mt-3">
              <label for="inputEmail4" class="form-label">پست الکترونیک</label>
              <input type="email" v-model.lazy="email" @focusout="emailValidate" class="form-control"
                placeholder="لطفااطلاعات خود را اینجا وارد نمایید." :class="[validateEmail]" id="inputEmail4">
              <div class="valid-feedback" v-if="validateEmail == 'is-valid'">خوب!</div>
              <div class="invalid-feedback" v-if="validateEmail == 'is-invalid'">
                لطفا از علامت @ استفاده نمایید.
              </div>
            </div>
            <div class="col text-end mt-3">
              <label for="inputPassword4" class="form-label">کلمه عبور</label>
              <input type="password" v-model.lazy="password" @focusout="passwordValidate" class="form-control"
                placeholder="لطفااطلاعات خود را اینجا وارد نمایید." :class="[validatePassword]" id="inputPassword4">
              <div class="valid-feedback" v-if="validatePassword == 'is-valid'">خوب!</div>
              <div class="invalid-feedback" v-if="validatePassword == 'is-invalid'">
                لطفا حداقل طول 6 کاراکتر،یک حرف بزرگ انگلیسی،یک حرف کوچک انگلیسی و یک عدد را استفاده نمایید.
              </div>
            </div>
            <div class="col-sm-2 mt-2 dir">
              <button type="submit" v-if="loding" disabled class="btn btn-primary">
                ورود
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden"></span>
                </div>
              </button>

              <button type="submit" v-else role="status" class="btn btn-primary">
                ورود

              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

