<template>
  <div id="login-container" class="login-container">
		<!-- FORM SECTION -->
		<div class="row">
			<!-- SIGN UP -->
			<div class="col align-items-center flex-col sign-up">
				<div class="form-wrapper align-items-center">
					<div class="form sign-up">
						<div class="input-group">
							<i class='bx bxs-user'></i>
							<input type="text" placeholder="Username">
						</div>
						<div class="input-group">
							<i class='bx bx-mail-send'></i>
							<input type="email" placeholder="Email">
						</div>
						<div class="input-group">
							<i class='bx bxs-lock-alt'></i>
							<input type="password" placeholder="Password">
						</div>
						<div class="input-group">
							<i class='bx bxs-lock-alt'></i>
							<input type="password" placeholder="Confirm password">
						</div>
						<button @click="sign_up">
							{{$t("Регистрироваться")}}
						</button>
						<p>
							<span>
								{{$t("У вас уже есть аккаунт?")}}
							</span>
							<b @click="toggle" class="pointer pl-1">
								{{ $t("войти здесь") }}
							</b>
						</p>
					</div>
				</div>
			
			</div>
			<!-- END SIGN UP -->
			<!-- SIGN IN -->
			<div class="col align-items-center flex-col sign-in">
				<div class="form-wrapper align-items-center">
					<div class="form sign-in">
						<div class="input-group">
							<i class='bx bxs-user'></i>
							<input type="text" placeholder="Username">
						</div>
						<div class="input-group">
							<i class='bx bxs-lock-alt'></i>
							<input type="password" placeholder="Password">
						</div>
						<button @click="sign_in">
							{{ $t("Войти") }}
						</button>
						<!-- <p>
							<b>
								Forgot password?
							</b>
						</p> -->
						<p>
							<span>
								{{ $t("У вас нет аккаунта?") }} 
							</span>
							<b @click="toggle()" class="pointer pl-1">
								{{$t("регистрироваться здесь")}}
							</b>
						</p>
            <Divider />
            <div class="flex justify-content-center">
              <a style="background-color: var(--login-primary-color); color: var(--white); border-radius: 50%; aspect-ratio: 1/1; padding: 6px;" 
                v-for="login in alt_logins" :title="login.title" :href="login.url" :key="login"
              >
                <font-awesome-icon :icon="login.icon" style="font-size: 2rem;"/>
            </a>
            </div>
					</div>
				</div>
				<div class="form-wrapper">
          
				</div>
			</div>
			<!-- END SIGN IN -->
		</div>
		<!-- END FORM SECTION -->
		<!-- CONTENT SECTION -->
		<div class="row content-row">
			<!-- SIGN IN CONTENT -->
			<div class="col align-items-center flex-col">
				<div class="text sign-in">
					<h2>
						{{ $t("Добро пожаловать") }}
					</h2>
				</div>
				<div class="img sign-in">
          <img style="width: 100%" src="/img/icons/favicon.png" placeholder="icon" class="pointer" @click="$router.push('/')"/>
				</div>
			</div>
			<!-- END SIGN IN CONTENT -->
			<!-- SIGN UP CONTENT -->
			<div class="col align-items-center flex-col">
				<div class="img sign-up">
				  <img style="width: 100%" src="/img/icons/favicon.png" placeholder="icon" class="pointer" @click="$router.push('/')"/>
				</div>
				<div class="text sign-up">
					<h2>
						{{ $t("Присоединяйтесь к нам") }}
					</h2>
	
				</div>
			</div>
			<!-- END SIGN UP CONTENT -->
		</div>
		<!-- END CONTENT SECTION -->
	</div>
</template>

<script>

export default {
  name: "LoginPage",
  data() {
    return {
      alt_logins: [
        {
          title: this.$t("Google"),
          url: "/",
          color: "var(--login-primary-color)",
          icon: "fa-brands fa-google"
        }
      ]
    }
  },
  async mounted() {
    setTimeout(() => {
      let container = document.getElementById('login-container')
      container.classList.add('sign-in')
    }, 200)
  },
  methods: {
    toggle(){
      let container = document.getElementById('login-container')
      container.classList.toggle('sign-in')
      container.classList.toggle('sign-up')
    },
    sign_up() {
      this.$router.push("/")
    },
    sign_in() {
      this.$router.push("/")
    }
  }
};
</script>

<style lang="scss">
:root {
    --login-primary-color: #4EA685;
    --login-secondary-color: #57B894;
    --black: #000000;
    --white: #ffffff;
    --gray: #efefef;
    --gray-2: #757575;

    --facebook-color: #4267B2;
    --google-color: #DB4437;
    --twitter-color: #1DA1F2;
    --insta-color: #E1306C;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    height: 100vh;
    overflow: hidden;
}

.login-container {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
}

.row {
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
}

.col {
    width: 50%;
}

.align-items-center {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.form-wrapper {
    width: 100%;
    max-width: 40rem;
}

.form {
    padding: 2rem;
    background-color: var(--white);
    border-radius: 1.5rem;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(0);
    transition: .5s ease-in-out;
    transition-delay: 1s;
}

.input-group {
    position: relative;
    width: 100%;
    margin: 1rem 0;
}

.input-group i {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 1.4rem;
    color: var(--gray-2);
}

.input-group input {
    width: 100%;
    padding: 1rem 3rem;
    font-size: 1rem;
    background-color: var(--gray);
    border-radius: .5rem;
    border: 0.125rem solid var(--white);
    outline: none;
}

.input-group input:focus {
    border: 0.125rem solid var(--login-primary-color);
}

.form button {
    cursor: pointer;
    width: 100%;
    padding: .6rem 0;
    border-radius: .5rem;
    border: none;
    background-color: var(--login-primary-color);
    color: var(--white);
    font-size: 1.2rem;
    outline: none;
}

.form p {
    margin: 1rem 0;
    font-size: 1rem;
}

.flex-col {
    flex-direction: column;
}

.social-list {
    margin: 2rem 0;
    padding: 1rem;
    border-radius: 1.5rem;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(0);
    transition: .5s ease-in-out;
    transition-delay: 1.2s;
}

.social-list>div {
    color: var(--white);
    margin: 0 .5rem;
    padding: .7rem;
    cursor: pointer;
    border-radius: .5rem;
    cursor: pointer;
    transform: scale(0);
    transition: .5s ease-in-out;
}

.social-list>div:nth-child(1) {
    transition-delay: 1.4s;
}

.social-list>div:nth-child(2) {
    transition-delay: 1.6s;
}

.social-list>div:nth-child(3) {
    transition-delay: 1.8s;
}

.social-list>div:nth-child(4) {
    transition-delay: 2s;
}

.social-list>div>i {
    font-size: 1.5rem;
    transition: .4s ease-in-out;
}

.social-list>div:hover i {
    transform: scale(1.5);
}

.facebook-bg {
    background-color: var(--facebook-color);
}

.google-bg {
    background-color: var(--google-color);
}

.twitter-bg {
    background-color: var(--twitter-color);
}

.insta-bg {
    background-color: var(--insta-color);
}

.pointer {
    cursor: pointer;
}

.login-container.sign-in .form.sign-in,
.login-container.sign-in .social-list.sign-in,
.login-container.sign-in .social-list.sign-in>div,
.login-container.sign-up .form.sign-up,
.login-container.sign-up .social-list.sign-up,
.login-container.sign-up .social-list.sign-up>div {
    transform: scale(1);
}

.content-row {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 6;
    width: 100%;
}

.text {
    margin: 4rem;
    color: var(--white);
}

.text h2 {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 2rem 0;
    transition: 1s ease-in-out;
    color: var(--white);
}

.text p {
    font-weight: 600;
    transition: 1s ease-in-out;
    transition-delay: .2s;
}

.img img {
    width: 30vw;
    transition: 1s ease-in-out;
    transition-delay: .4s;
}

.text.sign-in h2,
.text.sign-in p,
.img.sign-in img {
    transform: translateX(-350%);
}

.text.sign-up h2,
.text.sign-up p,
.img.sign-up img {
    transform: translateX(350%);
}

.login-container.sign-in .text.sign-in h2,
.login-container.sign-in .text.sign-in p,
.login-container.sign-in .img.sign-in img,
.login-container.sign-up .text.sign-up h2,
.login-container.sign-up .text.sign-up p,
.login-container.sign-up .img.sign-up img {
    transform: translateX(0);
}

/* BACKGROUND */

.login-container::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300vw;
    transform: translate(35%, 0);
    background-image: linear-gradient(-45deg, var(--login-primary-color) 0%, var(--login-secondary-color) 100%);
    transition: 1s ease-in-out;
    z-index: 6;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-bottom-right-radius: max(50vw, 50vh);
    border-top-left-radius: max(50vw, 50vh);
}

.login-container.sign-in::before {
    transform: translate(0, 0);
    right: 50%;
}

.login-container.sign-up::before {
    transform: translate(100%, 0);
    right: 50%;
}

/* RESPONSIVE */

@media only screen and (max-width: 425px) {
  .input-group input {
    font-size: 2rem;
  }

    .login-container::before,
    .login-container.sign-in::before,
    .login-container.sign-up::before {
        height: 100vh;
        border-bottom-right-radius: 0;
        border-top-left-radius: 0;
        z-index: 0;
        transform: none;
        right: 0;
    }

    /* .login-container.sign-in .col.sign-up {
        transform: translateY(100%);
    } */

    .login-container.sign-in .col.sign-in,
    .login-container.sign-up .col.sign-up {
        transform: translateY(-10%);
        padding-bottom: 10%;
    }

    .content-row {
        align-items: flex-start !important;
    }

    .content-row .col {
        transform: translateY(0);
        background-color: unset;
    }

    .col {
        width: 100%;
        position: absolute;
        padding: 2rem;
        background-color: var(--white);
        border-top-left-radius: 2rem;
        border-top-right-radius: 2rem;
        transform: translateY(100%);
        transition: 1s ease-in-out;
    }

    .row {
        align-items: flex-end;
        justify-content: center;
    }

    .form,
    .social-list {
        box-shadow: none;
        margin: 0;
        padding: 0;
    }

    .text {
        margin: 0;
    }

    .text p {
        display: none;
    }

    .text h2 {
        margin: .5rem;
        font-size: 3rem;
    }

    .form p {
      font-size: 2rem;
    }
}
</style>
