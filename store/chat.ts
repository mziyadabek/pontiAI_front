
import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", () => {
    const assistentId = ref<number | null>(null);
    const setAssistentId = (id: number) => {
        assistentId.value = id;
    }
    return {
        assistentId,
        setAssistentId,
    };
}, {
    persist: true
});