import React, { ReactElement } from "react";
import { RouteComponentProps } from "react-router-dom";
import Loading from "../components/Loading";
import useReactQuery from "../hooks/useReactQuery";
//TODO: change default image
import test from "../assets/user.jpg";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { getFormatedDate } from "../utils/utilities";
import { patch } from "../utils/requests";

interface ProfileRouterProps {
  username: string;
}

export default function Profile({
  match,
}: RouteComponentProps<ProfileRouterProps>): ReactElement {
  const profileFetcher = useReactQuery(
    `/user/profile/${match.params.username}`
  );

  const auth = useAuth();

  const isCurrentUserProfile = () =>
    match.params.username === auth?.user?.username;

  const handleAddFriend = async () => {
    const res = await patch(`/user/add-friend/${profileFetcher.data._id}`);
    console.log(res);
  };

  if (profileFetcher.isLoading) {
    return (
      <div className="screen-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="profile section">
      {/* TODO: add color to profilr page's top */}
      <div className="top">
        <img src={test} alt="" />
        <div className="name">
          <h2>{profileFetcher.data.name}</h2>
          <h3>@{profileFetcher.data.username}</h3>
        </div>
      </div>
      <div className="since">
        Member since {getFormatedDate(auth?.user?.createdAt)}
      </div>
      <div className="description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit
        veniam rerum quis perspiciatis officia delectus obcaecati, qui provident
        quae pariatur accusamus placeat tenetur sint quo nulla voluptatem
        dolorum aliquam iusto!
      </div>
      <div className="buttons">
        {!isCurrentUserProfile() && (
          <Button onClick={handleAddFriend}>
            <i className="fa fa-plus"></i>
            Add Friend
          </Button>
        )}
        {isCurrentUserProfile() && (
          <Button className="edit" secondary>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
}
