<template>
  <section>
    <Header />
    <b-container>
      <b-card>
        <b-form-group>
          <label>Email</label>
          <b-input v-model="email" />
        </b-form-group>
        <b-form-group>
          <label>Password</label>
          <b-input v-model="password"
                   type="password"
          />
        </b-form-group>
        <b-button variant="primary"
                  class="mr-2"
                  @click="login"
        >
          Login
        </b-button>
      </b-card>
    </b-container>
  </section>
</template>

<script lang="ts">
import * as axiosBase from '~/plugins/axios';
import Header from '~/components/Header.vue';

const axios = axiosBase.getInstance();

export default {
  components: {
    Header
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: async function() {
      const res: any = await axios.post('/auth/login', {
        email: this.email,
        password: this.password
      });
      localStorage.setItem('jwt', res.data.access_token);
      this.$router.push('/tasks');
    }
  },
  async asyncData() {}
};
</script>