import { defineStore } from 'pinia'
import type { EventInfo } from '~/types/api';
import type { Participant } from '~/types/api/participant';

export const useParticipantStore = defineStore("participant", {
  state: () => ({
    event_info: null as EventInfo | null,
    participant: null as Participant | null,
  }),
  actions: {
    setEventInfo(event_info: EventInfo) {
      this.event_info = event_info
    },
    setParticipant(participant: Participant) {
      this.participant = participant;
    },
    reset() {
      this.participant = null;
      this.event_info = null;
    },
  }
});
