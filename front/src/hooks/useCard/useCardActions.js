import cardService from "../../services/cardService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useCardActions() {
  const navigate = useNavigate();
  
  const  addCard = async (card) => {
    try {
      const { bizImage, ...body } = card;
      if (bizImage) {
        body.bizImage = bizImage;
      }
     await cardService.createCard(body);
      toast.success("The card was created successfully 👌");
      navigate("/my-cards");
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  const deleteCard = async(id) => {
    try {
       await cardService.deleteCard(id);
        toast.success("The card has been successfully deleted 👌");
        navigate('/my-cards');

    } catch  {
        navigate('/my-cards');
    }
       
  };
 
 const editCard = async (card, id) => {
    try {
      const { bizImage, ...body } = card;
      if (bizImage) {
        body.bizImage = bizImage;
      }
      await cardService.updateCard(id, body);
      navigate("/my-cards");
      toast.success("The card has been successfully updated 👌");

    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };
 
  return [addCard, editCard, deleteCard];
}

export default useCardActions;
