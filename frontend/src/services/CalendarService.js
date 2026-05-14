import { api } from '../api';
import initialMockEvents from '../mocks/responses/get_all_events.json';

const useMock = process.env.REACT_APP_USE_MOCK === "true";

// Use localStorage to persist mock events
const getMockEvents = () => {
  const stored = localStorage.getItem('mockEvents');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('mockEvents', JSON.stringify(initialMockEvents));
  return initialMockEvents;
};

const setMockEvents = (data) => {
  localStorage.setItem('mockEvents', JSON.stringify(data));
};

export const CalendarService = {
  getAllEvents: async () => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(getMockEvents()), 300)
      );
    }
    const response = await api.get('/v1/calendar/events');
    return response.data;
  },

  createEvent: async (data) => {
    if (useMock) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const eventsData = getMockEvents();
          const newEvent = {
            id: Math.random().toString(36).substring(2, 10),
            summary: data.summary,
            description: data.description,
            start: { dateTime: data.start_time },
            end: { dateTime: data.end_time },
            status: "confirmed"
          };
          eventsData.push(newEvent);
          setMockEvents(eventsData);
          resolve(newEvent);
        }, 300);
      });
    }
    const response = await api.post('/v1/calendar/events', data);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    if (useMock) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let eventsData = getMockEvents();
          eventsData = eventsData.filter(e => e.id !== eventId);
          setMockEvents(eventsData);
          resolve({ status: "success" });
        }, 300);
      });
    }
    const response = await api.delete(`/v1/calendar/events/${eventId}`);
    return response.data;
  }
};

