import { gql } from "@apollo/client";
import { client } from "../ApolloClient/client";

export const updateIntrest = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
        mutation updateProfile($id: String, $intrestedIn: [Int]) {
          updateProfile(id: $id, interestedIn: $intrestedIn) {
            interestedIn
          }
        }
      `,
      variables: { ...data },
    });
    return respose;
  } catch (error) {
    alert(error);
  }
};

export const updateTags = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
        mutation updateProfile($id: String, $tagIds: [Int]) {
          updateProfile(id: $id, tagIds: $tagIds) {
            interestedIn
          }
        }
      `,
      variables: { ...data },
    });
    return respose;
  } catch (error) {
    alert(error);
  }
};

export const updateAbout = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
        mutation updateProfile($id: String, $about: String) {
          updateProfile(id: $id, about: $about) {
            interestedIn
          }
        }
      `,
      variables: { ...data },
    });
    return respose;
  } catch (error) {
    alert(error);
  }
};

export const updateProfile = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
        mutation updateProfile(
          $id: String
          $fullName: String
          $about: String
          $age: Int
          $height: Int
          $gender: Int
          $language: [Int]
          $work: String
          $education: String
          $familyPlans: Int
          $music: [String]
          $tvShows: [String]
          $movies: [String]
          $sportsTeams: [String]
          $ethinicity: Int
          $politics: Int
          $religion: Int
          $zodiacSign: Int
        ) {
          updateProfile(
            id: $id
            fullName: $fullName
            about: $about
            age: $age
            height: $height
            gender: $gender
            language: $language
            work: $work
            education: $education
            familyPlans: $familyPlans
            music: $music
            tvShows: $tvShows
            movies: $movies
            sportsTeams: $sportsTeams
            ethinicity: $ethinicity
            politics: $politics
            religion: $religion
            zodiacSign: $zodiacSign
            registrationMethod: 1
          ) {
            interestedIn
          }
        }
      `,
      variables: { ...data },
    });
    return respose;
  } catch (error) {
    alert(error);
  }
};

export const updateLocation = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
        mutation updateProfile($id: String, $location: [Float]) {
          updateProfile(id: $id, location: $location) {
            interestedIn
          }
        }
      `,
      variables: { ...data },
    });
    return respose;
  } catch (error) {
    alert(error);
  }
};

export const deleteAccount = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
        mutation deleteProfile($id: UUID, $verificationCode: Int) {
          deleteProfile(id: $id, verificationCode: $verificationCode) {
            result
          }
        }
      `,
      variables: { ...data },
    });
    return respose;
  } catch (error) {
    alert(error);
  }
};

export const deleteAvatar = async (data) => {
  console.log(data, "data");
  try {
    const respose = await client.mutate({
      mutation: gql`
        mutation deleteAvatar($id: String!) {
          deleteAvatarPhoto(id: $id) {
            message
          }
        }
      `,
      variables: { ...data },
    });
    return respose;
  } catch (error) {
    alert(error);
  }
};
