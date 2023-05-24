<script setup>
import { ref } from 'vue';
import store from '@/store';
import router from '@/router';
import { useLayout } from '@/layout/composables/layout';

const username = ref('');
const password = ref('');

const login = async () => {
    const response = await store.dispatch('login', {
        username: username.value, password: password.value
    })
    localStorage.setItem('access', response.access)
    localStorage.setItem('refresh', response.refresh)
    const search = new URLSearchParams(window.location.search)
    if (search.get("next")) {
        window.location.href = search.get("next")
    } else {
        await router.push({name: 'survey_list'})
    }
}

</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, #22C55E 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/img/icons/favicon.png" alt="logo" width="300"/>
                        <div class="text-900 text-3xl font-medium mb-3">{{ $t('Авторизация') }}</div>
                    </div>

                    <form @submit.prevent="login">
                        <div class="field">
                            <label for="username" class="block text-900 text-xl font-medium mb-2">{{ $t('Username') }}</label>
                            <InputText id="username" type="text" :placeholder="$t('Username')" class="w-full md:w-30rem" style="padding: 1rem" v-model="username" />
                            <small id="username_error" style="word-wrap: break-word;" class="p-invalid d-block mb-5"></small>
                        </div>
                        <div class="field">
                            <label for="password1" class="block text-900 font-medium text-xl mb-2">{{ $t('Пароль') }}</label>
                            <Password :feedback="false" id="password" v-model="password" :placeholder="$t('Пароль')" :toggleMask="true" class="w-full" inputClass="w-full" inputStyle="padding:1rem"></Password>
                            <small id="password_error" class="p-invalid d-block mb-5"></small>
                        </div>

                        <Button type="submit" :label="$t('Войти')" class="w-full p-3 text-xl p-button-success" @click="login"></Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
