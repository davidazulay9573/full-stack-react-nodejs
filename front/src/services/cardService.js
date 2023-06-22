import httpService from "./httpService";

function createCard(card) {
  return httpService.post("/cards", card);
}

function updateCard(id, card) {
  return httpService.put(`/cards/${id}`, card);
}

export function deleteCard(id) {
  return httpService.delete(`/cards/${id}`);
}

function getCards() {
  return httpService.get("/cards");
}

function getCard(id) {
  return httpService.get(`/cards/${id}`);
}

const cardService = {
  createCard,
  deleteCard,
  updateCard,
  getCards,
  getCard,
};

export default cardService;
