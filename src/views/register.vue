<script setup>
import { ref } from 'vue';
import router from '../router';
import { useUsers } from '@/stores/auth'
import Header from './header.vue';
import Swal from 'sweetalert2'

const users = useUsers();
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const validateEmail = ref('');
const validatePassword = ref('');
const validatePasswordConfirmation = ref('');
const validatePasswordMassege = ref('')
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

const passwordCValidateConfirmation = () => {

  var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (password_confirmation.value == '') {
    validatePasswordConfirmation.value = '';

  }
  else if (password_confirmation.value !== '' && regex.test(password.value) == true) {
    validatePasswordConfirmation.value = 'is-valid';

  }
  else {
    validatePasswordConfirmation.value = 'is-invalid';
    password_confirmation.value = '';
  }

}
const submitsignup = () => {

  if (password.value !== password_confirmation.value) {
    validatePassword.value = 'is-invalid';
    validatePasswordConfirmation.value = 'is-invalid';
    validatePasswordMassege.value = 'کلمه عبور و تکرار کلمه عبور باید باهم برابر  باشند.'
  }
  else if (email.value == '' && password.value == '') {
    validateEmail.value = 'is-invalid';
    validatePassword.value = 'is-invalid';
  }
  else {
    loding.value = true
    users.signupUser(email.value, password.value)
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
          title: 'حساب کاربری با موفقیت ساخته شد.'
        })
        loding.value = false
        router.push({ path: '/login' })
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
};
</script>
<template>
  <Header></Header>
  <section class="container mt-5 " dir="rtl">
    <div class="row justify-content-md-center">
      <div class="col-6 card">

        <div class="card-body">
          <h1>ثبت نام</h1>
          <form class="mt-2" @submit.prevent="submitsignup">
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
              <div class="invalid-feedback" v-else-if="validatePassword == 'is-invalid'">
                لطفا حداقل طول 6 کاراکتر،یک حرف بزرگ انگلیسی،یک حرف کوچک انگلیسی و یک عدد را استفاده نمایید.
              </div>
              <div class="invalid-feedback" v-if="validatePasswordMassege">
                {{ validatePasswordMassege }}
              </div>
            </div>
            <div class="col text-end mt-3">
              <label for="inputPassword" class="form-label">تکرار کلمه عبور</label>
              <input type="password" v-model.lazy="password_confirmation" @focusout="passwordCValidateConfirmation"
                placeholder="لطفااطلاعات خود را اینجا وارد نمایید." class="form-control"
                :class="[validatePasswordConfirmation]" id="inputPassword">
              <div class="valid-feedback" v-if="validatePasswordConfirmation == 'is-valid'">خوب!</div>
              <div class="invalid-feedback" v-else-if="validatePasswordConfirmation == 'is-invalid'">
                لطفا حداقل طول 6 کاراکتر،یک حرف بزرگ انگلیسی،یک حرف کوچک انگلیسی و یک عدد را استفاده نمایید.
                {{ validatePasswordMassege }}
              </div>

            </div>
            <div class="col-sm-2 mt-2 dir">
              <button type="submit" class="btn btn-primary">ثبت نام</button>
            </div>
          </form>
        </div>
      </div>


    </div>
  </section>
</template>


