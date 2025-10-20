import { useState, FormEvent } from 'react';
import { Calendar, Mail, Phone, User, Loader2 } from 'lucide-react';

interface BookingFormProps {
  onSuccess: () => void;
}

export function BookingForm({ onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    'Initial Consultation',
    'Follow-up Consultation',
    'Panchakarma Therapy',
    'Ayurvedic Massage',
    'Dietary Consultation',
    'Lifestyle Counseling'
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Booking submitted:', formData);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        notes: ''
      });
      onSuccess();
    }, 1500);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="booking-name" className="block text-sm font-medium text-charcoal mb-2">
          <User className="w-4 h-4 inline mr-2" />
          Full Name
        </label>
        <input
          type="text"
          id="booking-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.name ? 'border-red-400' : 'border-charcoal/20'
          } focus:outline-none focus:ring-2 focus:ring-sage/50 bg-ivory`}
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-email" className="block text-sm font-medium text-charcoal mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </label>
          <input
            type="email"
            id="booking-email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? 'border-red-400' : 'border-charcoal/20'
            } focus:outline-none focus:ring-2 focus:ring-sage/50 bg-ivory`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="booking-phone" className="block text-sm font-medium text-charcoal mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone
          </label>
          <input
            type="tel"
            id="booking-phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone ? 'border-red-400' : 'border-charcoal/20'
            } focus:outline-none focus:ring-2 focus:ring-sage/50 bg-ivory`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-charcoal mb-2">
          Service Type
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.service ? 'border-red-400' : 'border-charcoal/20'
          } focus:outline-none focus:ring-2 focus:ring-sage/50 bg-ivory`}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-charcoal mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Preferred Date
          </label>
          <input
            type="date"
            id="date"
            min={today}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.date ? 'border-red-400' : 'border-charcoal/20'
            } focus:outline-none focus:ring-2 focus:ring-sage/50 bg-ivory`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-charcoal mb-2">
            Preferred Time
          </label>
          <select
            id="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.time ? 'border-red-400' : 'border-charcoal/20'
            } focus:outline-none focus:ring-2 focus:ring-sage/50 bg-ivory`}
          >
            <option value="">Select a time</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-charcoal mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-sage/50 bg-ivory resize-none"
          placeholder="Any specific concerns or requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-mutedBrown text-ivory rounded-full hover:bg-earthBrown transition-all duration-300 font-medium text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Booking...
          </>
        ) : (
          'Book Appointment'
        )}
      </button>
    </form>
  );
}
