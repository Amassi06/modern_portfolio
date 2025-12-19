import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState(''); // 'success', 'error', or ''
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Le nom est requis';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email invalide';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Le message est requis';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Le message doit contenir au moins 10 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setStatus('sending');

        try {
            // Utilise Formspree pour envoyer l'email
            // Remplace 'YOUR_FORM_ID' par ton ID Formspree (va sur formspree.io pour créer un formulaire gratuit)
            const response = await fetch('https://formspree.io/f/xrezepeb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _replyto: formData.email,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus(''), 5000);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            {/* Name */}
            <div>
                <label htmlFor="name" className="block text-slate-light font-mono text-sm mb-2">
                    Nom
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-navy-light border ${errors.name ? 'border-red-500' : 'border-green/20'
                        } rounded text-slate-lightest focus:outline-none focus:border-green transition-colors`}
                    placeholder="Votre nom"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-slate-light font-mono text-sm mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-navy-light border ${errors.email ? 'border-red-500' : 'border-green/20'
                        } rounded text-slate-lightest focus:outline-none focus:border-green transition-colors`}
                    placeholder="votre@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-slate-light font-mono text-sm mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 bg-navy-light border ${errors.message ? 'border-red-500' : 'border-green/20'
                        } rounded text-slate-lightest focus:outline-none focus:border-green transition-colors resize-none`}
                    placeholder="Votre message..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-big w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'sending' ? (
                    <>
                        <div className="w-5 h-5 border-2 border-green border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        <FaPaperPlane />
                        Envoyer le message
                    </>
                )}
            </button>

            {/* Success Message */}
            {status === 'success' && (
                <div className="bg-green/10 border border-green/20 rounded p-4 text-green">
                    ✓ Message envoyé avec succès ! Je vous répondrai bientôt.
                </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded p-4 text-red-500">
                    ✗ Erreur lors de l'envoi. Veuillez réessayer ou m'envoyer un email directement.
                </div>
            )}
        </form>
    );
};

export default ContactForm;
