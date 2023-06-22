import { useState, useEffect } from "react";
import cardService from "../../services/cardService";
function useCard(id) { 
  
  const [card, setCard] = useState([]);

  useEffect(() => {
    const getCard = async () => {
      const { data } = await cardService.getCard(id);
      setCard(data);
    };
    getCard();
  }, [id]);

  return card;
}

export default useCard;
