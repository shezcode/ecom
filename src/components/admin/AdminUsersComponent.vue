<script lang="ts">
import { ref, onMounted } from 'vue';
import type { User } from '@/types/user';
import api from '@/services/api';

const users = ref<User[]>([]);
const loading = ref(false);
const search = ref('');
const dialog = ref(false);
const userToToggle = ref<User | null>(null);

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Avatar', key: 'avatar', sortable: false, align: 'center' },
  { title: 'Name', key: 'fullName', sortable: true },
  { title: 'Username', key: 'username', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Role', key: 'role', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
];

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await api.get('/users');
    users.value = response.data.map((user: User) => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
    }));
  } catch (error) {
    console.error('error fetching users: ', error);
  } finally {
    loading.value = false;
  }
};

const toggleUserRole = (user: User) => {
  userToToggle.value = user;
  dialog.value = true;
};

const confirmToggleRole = async () => {
  if (!userToToggle.value) return;

  loading.value = true;
  try {
    const newRole = userToToggle.value.role === 'admin' ? 'user' : 'admin';
    const updatedUser = { ...userToToggle.value, role: newRole };

    await api.put(`/users/${userToToggle.value.id}`, updatedUser);

    const index = users.value.findIndex((u) => u.id === userToToggle.value!.id);
    if (index === -1) {
      users.value[index] = {
        ...updatedUser,
        fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
      };
    }

    alert(`User role changed to ${newRole} successfully!`);
    closeDialog();
  } catch (error) {
    console.error('Error updating user role: ', error);
    alert('Error updating user role. Please try again.');
  } finally {
    loading.value = false;
  }
};

const closeDialog = () => {
  dialog.value = false;
  userToToggle.value = null;
};

const getRoleColor = (role: string) => {
  return role === 'admin' ? 'error' : 'primary';
};

const getRoleIcon = (role: string) => {
  return role === 'admin' ? 'mdi-shield-account' : 'mdi-account';
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="admin-users">
    <v-container>
      <v-row class="mb-4">
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between">
            <div>
              <h1 class="text-h4 text-white mb-2">Users Management</h1>
              <p class="text-body-1 text-grey">Manage user accounts and roles</p>
            </div>
            <v-btn color="primary" @click="fetchUsers" prepend-icon="mdi-refresh" size="large"
              >Refresh</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
