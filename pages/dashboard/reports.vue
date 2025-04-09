<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const reports = [
  {
    id: 1,
    name: "Monthly Sales Report",
    date: "2025-03-01",
    status: "Completed",
  },
  {
    id: 2,
    name: "User Growth Analysis",
    date: "2025-02-28",
    status: "Pending",
  },
  { id: 3, name: "Revenue Breakdown", date: "2025-02-27", status: "Completed" },
];
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">📑 Reports</h1>
    <div class="bg-white p-4 rounded shadow">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="text-left p-2">Report Name</th>
            <th class="text-left p-2">Date</th>
            <th class="text-left p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b" v-for="report in reports" :key="report.id">
            <td class="p-2">{{ report.name }}</td>
            <td class="p-2">{{ report.date }}</td>
            <td class="p-2">
              <span
                :class="
                  report.status === 'Completed'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                "
              >
                {{ report.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
