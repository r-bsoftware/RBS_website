// API endpoint for contact form submission
// Forwards to Camino CRM as a support ticket

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CAMINO_API_URL, CAMINO_API_KEY } from '$env/static/private';

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  product?: string;
  message: string;
}

/**
 * POST /api/contact
 * Submit contact form and forward to Camino CRM
 */
export const POST: RequestHandler = async ({ request }) => {
  let body: ContactRequest;

  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON body');
  }

  // Validate required fields
  if (!body.name?.trim()) {
    throw error(400, 'El nombre es requerido');
  }
  if (!body.email?.trim()) {
    throw error(400, 'El email es requerido');
  }
  if (!body.message?.trim()) {
    throw error(400, 'El mensaje es requerido');
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    throw error(400, 'Email inválido');
  }

  // Build description with all form data
  const description = [
    `**Mensaje:**\n${body.message}`,
    body.company ? `**Empresa:** ${body.company}` : null,
    body.phone ? `**Teléfono:** ${body.phone}` : null,
    body.product ? `**Producto de interés:** ${body.product}` : null,
    `---`,
    `Enviado desde: redbroomsoftware.com`
  ].filter(Boolean).join('\n\n');

  // Generate a unique ticket ID for tracking
  const sourceTicketId = `web_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  // Forward to Camino CRM
  if (CAMINO_API_URL && CAMINO_API_KEY) {
    try {
      const caminoResponse = await fetch(`${CAMINO_API_URL}/api/support/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CAMINO_API_KEY}`
        },
        body: JSON.stringify({
          source_app: 'website',
          source_ticket_id: sourceTicketId,
          tenant_id: 'rbs_website',
          user_id: body.email, // Use email as user ID for website visitors
          user_name: body.name,
          user_email: body.email,
          user_phone: body.phone || null,
          subject: body.product
            ? `[Website] Consulta sobre ${body.product}`
            : '[Website] Formulario de contacto',
          description,
          category: 'question',
          priority: 'medium',
          metadata: {
            company: body.company,
            product_interest: body.product,
            source: 'website_contact_form'
          }
        })
      });

      if (!caminoResponse.ok) {
        const errorText = await caminoResponse.text();
        console.error('Camino CRM error:', caminoResponse.status, errorText);
        // Don't fail the request if Camino is unavailable - we still want to confirm receipt
      } else {
        const result = await caminoResponse.json();
        console.log('Contact forwarded to Camino:', result.ticket_id);
      }
    } catch (err) {
      console.error('Error forwarding to Camino:', err);
      // Continue - don't fail the user request
    }
  } else {
    console.warn('Camino CRM not configured - contact form submission not forwarded');
  }

  return json({
    success: true,
    message: '¡Gracias por contactarnos! Te responderemos pronto.',
    reference: sourceTicketId
  });
};
