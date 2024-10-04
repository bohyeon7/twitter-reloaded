import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin: 10px 0;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({ username, tweet, photo, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm('정말 삭제하시겠습니까?');
    if (!ok || user?.uid !== userId)
      return;
    try {
      // 게시글 삭제
      await deleteDoc(doc(db, "tweets", id));
      // 첨부파일 삭제
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${id}`)
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error);
    } finally {

    }
  }
  return <Wrapper>
    <Column>
      <Username>{username}</Username>
      <Payload>{tweet}</Payload>
      {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
    </Column>
    {photo ?
      <Column>
        <Photo src={photo} />
      </Column>
      : null}
  </Wrapper>
}