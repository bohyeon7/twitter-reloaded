import { collection, getDocs, onSnapshot, orderBy, query, Unsubscribe } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";

export interface ITweet {
  id: string;
  photo: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  margin-top: 60px;
`;

export default function Timeline() {
  // interface 배열 초기값
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
      );
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { photo, tweet, userId, username, createdAt } = doc.data();
          return {
            photo,
            tweet,
            userId,
            username,
            createdAt,
            id: doc.id,
          }
        });
        setTweets(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    }
  }, []);
  return <Wrapper>
    {tweets.map((tweet) => (
      <Tweet key={tweet.id} {...tweet} />
    ))}
  </Wrapper>
}