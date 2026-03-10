<script lang="ts">
  import { _ } from 'svelte-i18n';

  const CAMINO_URL = 'https://camino.redbroomsoftware.com/api/public/sales-chat';

  interface Message {
    role: 'user' | 'assistant';
    content: string;
  }

  let isOpen = $state(false);
  let messages = $state<Message[]>([]);
  let inputText = $state('');
  let isLoading = $state(false);
  let chatContainer: HTMLDivElement | undefined = $state();

  function getVisitorId(): string {
    if (typeof localStorage === 'undefined') return `v_${Date.now()}`;
    let id = localStorage.getItem('rbs_visitor_id');
    if (!id) {
      id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem('rbs_visitor_id', id);
    }
    return id;
  }

  function scrollToBottom() {
    if (chatContainer) {
      setTimeout(() => {
        chatContainer!.scrollTop = chatContainer!.scrollHeight;
      }, 50);
    }
  }

  function stripLeadTags(text: string): string {
    return text.replace(/\[LEAD:[^\]]+\]/g, '').trim();
  }

  async function sendMessage() {
    const text = inputText.trim();
    if (!text || isLoading) return;

    inputText = '';
    messages.push({ role: 'user', content: text });
    scrollToBottom();

    isLoading = true;

    // Add placeholder for assistant response
    const assistantIndex = messages.length;
    messages.push({ role: 'assistant', content: '' });

    try {
      const response = await fetch(CAMINO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.slice(0, -1).map(m => ({ role: m.role, content: m.content })),
          visitorId: getVisitorId()
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        messages[assistantIndex].content = (err as any).fallback || 'Lo siento, hubo un error. Intenta de nuevo.';
        isLoading = false;
        scrollToBottom();
        return;
      }

      // Stream the response
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              messages[assistantIndex].content += parsed.content;
              scrollToBottom();
            }
          } catch {
            // skip
          }
        }
      }

      // Clean up any LEAD tags from visible text
      messages[assistantIndex].content = stripLeadTags(messages[assistantIndex].content);

    } catch {
      messages[assistantIndex].content = 'Lo siento, no pude conectar con el servidor. Intenta de nuevo.';
    }

    isLoading = false;
    scrollToBottom();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen && messages.length === 0) {
      messages.push({
        role: 'assistant',
        content: '¡Hola! Soy el asistente de Red Broom Software. ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros productos, agendar una demo, o resolver tus dudas.'
      });
    }
    scrollToBottom();
  }
</script>

<!-- Floating Chat Button -->
<button
  onclick={toggleChat}
  class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/40"
  aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
>
  {#if isOpen}
    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  {:else}
    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  {/if}
</button>

<!-- Chat Panel -->
{#if isOpen}
  <div class="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/50 max-sm:bottom-0 max-sm:right-0 max-sm:h-full max-sm:w-full max-sm:rounded-none"
    style="background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(24px);">

    <!-- Header -->
    <div class="flex items-center gap-3 border-b border-slate-700/50 px-4 py-3">
      <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
        <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div class="flex-1">
        <p class="text-sm font-semibold text-white">Red Broom Software</p>
        <p class="text-xs text-slate-400">Asistente de ventas</p>
      </div>
      <button onclick={toggleChat} class="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white sm:hidden">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Messages -->
    <div bind:this={chatContainer} class="flex-1 overflow-y-auto px-4 py-3 space-y-3" style="scrollbar-width: thin; scrollbar-color: #334155 transparent;">
      {#each messages as msg}
        <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
          <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed {msg.role === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
            : 'bg-slate-800/80 text-slate-200 rounded-bl-md border border-slate-700/30'}">
            {#if msg.content}
              {msg.content}
            {:else}
              <span class="inline-flex gap-1">
                <span class="h-2 w-2 animate-bounce rounded-full bg-slate-400" style="animation-delay: 0ms"></span>
                <span class="h-2 w-2 animate-bounce rounded-full bg-slate-400" style="animation-delay: 150ms"></span>
                <span class="h-2 w-2 animate-bounce rounded-full bg-slate-400" style="animation-delay: 300ms"></span>
              </span>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <!-- Input -->
    <div class="border-t border-slate-700/50 px-4 py-3">
      <div class="flex items-center gap-2">
        <input
          type="text"
          bind:value={inputText}
          onkeydown={handleKeydown}
          placeholder="Escribe tu mensaje..."
          disabled={isLoading}
          class="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500 disabled:opacity-50"
        />
        <button
          onclick={sendMessage}
          disabled={isLoading || !inputText.trim()}
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:hover:shadow-none"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      <p class="mt-2 text-center text-[10px] text-slate-600">Powered by RBS AI</p>
    </div>
  </div>
{/if}
