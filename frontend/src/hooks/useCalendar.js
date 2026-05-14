import { useState, useEffect } from 'react';
import { CalendarService } from '../services/CalendarService';

export const useCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const result = await CalendarService.getAllEvents();
      setEvents(result);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
      setError("Erro ao carregar agenda.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (eventData) => {
    try {
      const newEvent = await CalendarService.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      return true;
    } catch (err) {
      console.error("Erro ao criar evento:", err);
      return false;
    }
  };

  const removeEvent = async (eventId) => {
    try {
      await CalendarService.deleteEvent(eventId);
      setEvents(prev => prev.filter(e => e.id !== eventId));
      return true;
    } catch (err) {
      console.error("Erro ao deletar evento:", err);
      return false;
    }
  };

  return { events, loading, error, addEvent, removeEvent, refreshEvents: fetchEvents };
};
