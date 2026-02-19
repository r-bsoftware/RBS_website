<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	const lastUpdated = '19 de diciembre de 2025';
</script>

<svelte:head>
	<title>Aviso de Privacidad - Red Broom Software</title>
	<meta name="description" content="Aviso de Privacidad de Red Broom Software S.A.S. de C.V. Conoce cómo protegemos y tratamos tus datos personales." />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<!-- Content -->
<main class="py-16 px-4 sm:px-6 lg:px-8">
	<article class="max-w-4xl mx-auto">
		<div class="mb-12">
			<h1 class="text-4xl font-bold text-white mb-4">Aviso de Privacidad</h1>
			<p class="text-slate-400">Última actualización: {lastUpdated}</p>
		</div>

		<div class="prose prose-invert prose-slate max-w-none space-y-8">
			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">1. Identidad del Responsable</h2>
				<p class="text-slate-300 leading-relaxed">
					<strong class="text-white">Red Broom Software S.A.S. de C.V.</strong> (en adelante "RBS", "nosotros" o "la Empresa"),
					con domicilio en Ciudad de México, México, es responsable del tratamiento de sus datos personales.
				</p>
				<p class="text-slate-300 leading-relaxed mt-4">
					Para cualquier duda o ejercicio de derechos ARCO, puede contactarnos en:
					<a href="mailto:dia@redbroomsoftware.com" class="text-blue-400 hover:text-blue-300">dia@redbroomsoftware.com</a>
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">2. Datos Personales Recabados</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					Para las finalidades señaladas en el presente aviso de privacidad, podemos recabar las siguientes categorías de datos personales:
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					<li><strong class="text-white">Datos de identificación:</strong> nombre completo, RFC, CURP, dirección</li>
					<li><strong class="text-white">Datos de contacto:</strong> correo electrónico, número telefónico</li>
					<li><strong class="text-white">Datos laborales:</strong> nombre de la empresa, cargo, giro comercial</li>
					<li><strong class="text-white">Datos fiscales:</strong> régimen fiscal, certificados digitales (CSD), domicilio fiscal</li>
					<li><strong class="text-white">Datos financieros:</strong> información bancaria para procesamiento de pagos</li>
					<li><strong class="text-white">Datos de uso:</strong> información sobre cómo utiliza nuestros servicios, logs de acceso</li>
				</ul>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">3. Finalidades del Tratamiento</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					Sus datos personales serán utilizados para las siguientes finalidades primarias:
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					<li>Provisión de servicios de software contratados (POS, ERP, CRM, facturación)</li>
					<li>Emisión de Comprobantes Fiscales Digitales por Internet (CFDI)</li>
					<li>Procesamiento de pagos y transacciones</li>
					<li>Soporte técnico y atención al cliente</li>
					<li>Comunicaciones relacionadas con su cuenta y servicios</li>
					<li>Cumplimiento de obligaciones legales y fiscales</li>
				</ul>
				<p class="text-slate-300 leading-relaxed mt-4 mb-4">
					Finalidades secundarias (puede oponerse):
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					<li>Envío de comunicaciones promocionales y de marketing</li>
					<li>Encuestas de satisfacción y mejora de servicios</li>
					<li>Invitaciones a eventos y webinars</li>
				</ul>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">4. Transferencias de Datos</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					Sus datos personales podrán ser transferidos a:
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					<li><strong class="text-white">Proveedores de servicios en la nube:</strong> para almacenamiento y procesamiento (Google Cloud, Firebase)</li>
					<li><strong class="text-white">Proveedores de Autorización de Certificados (PAC):</strong> para timbrado de CFDI ante el SAT</li>
					<li><strong class="text-white">Procesadores de pago:</strong> para gestión de transacciones</li>
					<li><strong class="text-white">Autoridades competentes:</strong> cuando sea requerido por ley</li>
				</ul>
				<p class="text-slate-300 leading-relaxed mt-4">
					Todas las transferencias se realizan conforme a la legislación aplicable y con las medidas de seguridad necesarias.
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">5. Derechos ARCO</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					Usted tiene derecho a:
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					<li><strong class="text-white">Acceder</strong> a sus datos personales en nuestra posesión</li>
					<li><strong class="text-white">Rectificar</strong> sus datos cuando sean inexactos o incompletos</li>
					<li><strong class="text-white">Cancelar</strong> sus datos cuando considere que no se requieren para las finalidades</li>
					<li><strong class="text-white">Oponerse</strong> al tratamiento de sus datos para fines específicos</li>
				</ul>
				<p class="text-slate-300 leading-relaxed mt-4">
					Para ejercer estos derechos, envíe su solicitud a
					<a href="mailto:dia@redbroomsoftware.com" class="text-blue-400 hover:text-blue-300">dia@redbroomsoftware.com</a>
					con los siguientes datos: nombre completo, descripción clara de su solicitud, documentos que acrediten su identidad.
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">6. Medidas de Seguridad</h2>
				<p class="text-slate-300 leading-relaxed">
					Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales, incluyendo:
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2 mt-4">
					<li>Encriptación AES-256 para datos sensibles</li>
					<li>Conexiones seguras mediante HTTPS/TLS</li>
					<li>Controles de acceso basados en roles</li>
					<li>Monitoreo y auditoría de accesos</li>
					<li>Respaldos automáticos y plan de recuperación</li>
					<li>Cumplimiento con estándares PCI DSS para datos de pago</li>
				</ul>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">7. Uso de Cookies y Tecnologías</h2>
				<p class="text-slate-300 leading-relaxed">
					Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestros sitios web.
					Estas tecnologías nos permiten recordar sus preferencias, analizar el uso del sitio y personalizar contenido.
					Puede configurar su navegador para rechazar cookies, aunque esto podría afectar la funcionalidad del sitio.
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">8. Cambios al Aviso de Privacidad</h2>
				<p class="text-slate-300 leading-relaxed">
					Nos reservamos el derecho de modificar este aviso de privacidad en cualquier momento.
					Los cambios serán publicados en esta página y, en caso de cambios significativos,
					le notificaremos por correo electrónico. Le recomendamos revisar periódicamente esta página.
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">9. Contacto</h2>
				<p class="text-slate-300 leading-relaxed">
					Si tiene preguntas sobre este aviso de privacidad o sobre el tratamiento de sus datos personales,
					puede contactarnos en:
				</p>
				<div class="mt-4 text-slate-300">
					<p><strong class="text-white">Red Broom Software S.A.S. de C.V.</strong></p>
					<p>Ciudad de México, México</p>
					<p>Email: <a href="mailto:dia@redbroomsoftware.com" class="text-blue-400 hover:text-blue-300">dia@redbroomsoftware.com</a></p>
				</div>
			</section>
		</div>
	</article>
</main>

<Footer />
