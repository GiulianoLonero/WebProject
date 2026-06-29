module.exports = {
  openapi: "3.0.0",
  info: {
    title: "E-vent API Documentation",
    version: "1.0.0",
    description: "Documentazione E-vent",
  },
  servers: [
    { url: "http://localhost:5000", description: "Locale" },
    { url: "https://e-vent-server.onrender.com", description: "Render" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    "/api/v1/auth": {
      post: {
        summary: "Login utente",
        tags: ["Auth"],
        responses: { 200: { description: "Successo" }, 401: { description: "Credenziali errate" } }
      }
    },
    "/api/v1/auth/refresh": {
      get: {
        summary: "Refresh token",
        tags: ["Auth"],
        responses: { 200: { description: "Successo" } }
      }
    },
    "/api/v1/auth/logout": {
      post: {
        summary: "Logout utente",
        tags: ["Auth"],
        responses: { 200: { description: "Successo" } }
      }
    },
    "/api/v1/events": {
      get: {
        summary: "Cerca e filtra eventi",
        tags: ["Events"],
        responses: { 200: { description: "Successo" } }
      },
      post: {
        summary: "Crea evento (Admin)",
        tags: ["Events"],
        security: [{ bearerAuth: [] }],
        responses: { 201: { description: "Creato" } }
      },
      put: {
        summary: "Modifica evento (Admin)",
        tags: ["Events"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Successo" } }
      },
      delete: {
        summary: "Elimina evento (Admin)",
        tags: ["Events"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Successo" } }
      }
    },
    "/api/v1/events/all-events": {
      get: {
        summary: "Recupera tutti gli eventi",
        tags: ["Events"],
        responses: { 200: { description: "Successo" } }
      }
    },
    "/api/v1/events/saved-events": {
      put: {
        summary: "Salva nei preferiti",
        tags: ["Events"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Successo" } }
      },
      delete: {
        summary: "Rimuovi dai preferiti",
        tags: ["Events"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Successo" } }
      }
    },
    "/api/v1/users/register": {
      post: {
        summary: "Registra utente",
        tags: ["Users"],
        responses: { 201: { description: "Successo" } }
      }
    },
    "/api/v1/users/{id}": {
      get: {
        summary: "Ottieni utente da ID",
        tags: ["Users"],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Successo" } }
      }
    },
    "/api/v1/users/edit": {
      put: {
        summary: "Modifica profilo",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Successo" } }
      }
    }
  }
};