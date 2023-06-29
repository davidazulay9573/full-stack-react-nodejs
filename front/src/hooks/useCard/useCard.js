import { useState, useEffect } from "react";
import cardService from "../../services/cardService";
function useCard(id) { 
  
  const [card, setCard] = useState([]);

  useEffect(() => {
   (async () => {
      const { data } = await cardService.getCard(id);
      setCard(data);
    })();

  }, [id]);

  return card;
}

export default useCard;
