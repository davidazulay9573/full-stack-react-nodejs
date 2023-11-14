import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCardActions from "../../hooks/useCard/useCardActions";
function DeleteCard() {
  const { id } = useParams();
  const [, , deleteCard] = useCardActions();
  useEffect(() => {
    deleteCard(id);
  }, [id, deleteCard]);
  return null;
}

export default DeleteCard;
