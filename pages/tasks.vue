<template>
  <section>
    <Header />
    <b-container>
      <b-card title="New Task"
              class="mb-3"
      >
        <b-alert v-if="error"
                 variant="danger"
                 show
        >
          {{ error }}
        </b-alert>
        <b-form-group>
          <b-input v-model="content" />
        </b-form-group>
        <b-button variant="primary"
                  @click="createTask"
                  class="mr-2"
        >
          Create
        </b-button>
        <b-button @click="logout">Logout</b-button>
      </b-card>
      <div v-for="task in tasks" :key="task.id">
        <b-card class="mb-3">
          <b-form-group>
            <b-input v-model="task.content" />
          </b-form-group>
          <b-button variant="success"
                    class="mr-2"
                    @click="updateTask(task.id, task.content)"
          >
            Update
          </b-button>
          <b-button variant="danger"
                    @click="deleteTask(task.id)"
          >
            Delete
          </b-button>
        </b-card>
      </div>
    </b-container>
  </section>
</template>

<script lang="ts">
import * as axiosBase from '~/plugins/axios';
import Header from '~/components/Header.vue';

const axios = axiosBase.getInstance();

const getTasks = async () => {
  return axios.get('/tasks', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      Accept: 'application/json'
    }
  });
};

export default {
  components: {
    Header
  },
  data() {
    return {
      tasks: [],
      content: '',
      error: ''
    };
  },
  methods: {
    logout: async function() {
      // await axios.post('/auth/logout', {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      // });
      localStorage.removeItem('jwt');
      this.$router.push('/');
    },
    createTask: async function() {
      await axios
        .post(
          '/tasks',
          { content: this.content },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
          }
        )
        .catch(error => {
          this.error = error.response.data.message;
        });
      const res: any = await getTasks();
      this.tasks = res.data.data;
      this.content = '';
    },
    updateTask: async function(id, content) {
      await axios.put(
        `/tasks/${id}`,
        {
          content: content
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      );
      const res = await getTasks();
      this.tasks = res.data.data;
    },
    deleteTask: async function(taskId) {
      await axios.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });
      const res = await getTasks();
      this.tasks = res.data.data;
    }
  },
  async created() {
    const res: any = await getTasks().catch(err => this.$router.push('/'));
    this.tasks = res.data.data;
  }
};
</script>
