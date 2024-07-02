import { gql, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { deleteAccount, updateLocation } from '../../mutation/update'
import { useRouter } from 'next/router'

const TAGS_QUERY = gql`
query defaultPicker{
    defaultPicker {
      politicsPicker{
        id
        value
      }
      tagsPicker{
        id
        value
      }
      ethnicityPicker{
        id
        value
      }
      heightsPicker{
        id
        value
      }
    }
  }
`

const TagsData = ({ tags }) => {
  const tagsArray = tags

  const [getTagsData, { data, error }] = useLazyQuery(TAGS_QUERY);

  useEffect(() => {
    getTagsData();
  }, []);

  console.log(error)

  let tagsData = (data?.defaultPicker?.tagsPicker)
  const filteredTags = tagsData && tagsData.filter(item => tagsArray && tagsArray.includes(item.id));

  return (
    <>
      <span className="gold-color font-weight-bold">Tags</span>
      <div className="user-badge  ">
        {filteredTags && filteredTags.map((item, index) => (
          <div style={{ margin: "10px 0 0 20px" }}>
            <button key={index} className="global-btn-3">{item?.value}</button>
          </div>
        ))}

      </div>
    </>
  )
}


export const PoliticData = ({ politics }) => {
  let politicsId = politics
  // console.log(politicsId)
  const [getTagsData, { data, error, loading }] = useLazyQuery(TAGS_QUERY);

  useEffect(() => {
    getTagsData();
  }, []);


  console.log(error)
  //  console.log(data)
  let politicsData = (data?.defaultPicker?.politicsPicker)
  const selectedPolitics = politicsData?.find(item => item.id === politicsId);
  //  console.log(selectedPolitics);
  return (
    <>
      <span className="gold-color font-weight-bold mt-3">Political Views</span>
      <p>{selectedPolitics?.value}</p>
    </>
  )
}



export const EthinicityData = ({ ethenic }) => {
  let ethenicId = ethenic
  // console.log(politicsId)
  const [getTagsData, { data, error, loading }] = useLazyQuery(TAGS_QUERY);

  useEffect(() => {
    getTagsData();
  }, []);

  console.log(error)
  //  console.log(data)
  let ethenicsData = (data?.defaultPicker?.ethnicityPicker)
  const selectedEthenic = ethenicsData?.find(item => item.id === ethenicId);
  // console.log(selectedEthenic);
  return (
    <>
      <span className="gold-color font-weight-bold mt-3">Ethenicity</span>
      <p>{selectedEthenic?.value}</p>
    </>
  )
}


export const HeightData = ({ height }) => {
  let heightId = height;

  const [getTagsData, { data, error, loading }] = useLazyQuery(TAGS_QUERY);

  useEffect(() => {
    getTagsData();
  }, []);


  console.log(error)
  //  console.log(data)
  let heightData = (data?.defaultPicker?.heightsPicker)
  const selectedHeight = heightData?.find(item => item.id === heightId);
  return (
    <>
      {/* <div style={{display:'flex'}}>
                        <span className="gold-color font-weight-bold">Height :</span>
                        <p>{selectedHeight?.value}</p>
                        </div> */}
      <div className='about-attribute'>
        <span className='light-gold-color font-weight-bold'>Height : </span>
        <p className='profile-btn'>{selectedHeight?.value}</p>
      </div>
    </>
  )
}


export const LocationComponent = () => {
  const router = useRouter();
  const [userId, setUserId] = useState();
  console.log(userId)
  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem('userId');
    setUserId(id || '');
  }, []);


  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false)
  console.log(latitude)
  console.log(longitude)

  let cord = [latitude, longitude]
  console.log(cord)

  const getLocation = () => {
    setLoad(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoad(false);
        },
        (error) => {
          setError(error.message);
          setLoad(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoad(false);
    }
  };
  const fetchData = async () => {
    try {
      if (userId && latitude !== null && longitude !== null) {
        const response = await updateLocation({
          id: userId,
          location: [latitude, longitude]
        });
        console.log(response);
        if (response) {
          router.push('/my-profile');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [load])
  return (
    <div>
      <button onClick={getLocation}>Get Current Location</button>
      {latitude && longitude && (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export const AccountDelete = ({ userId }) => {
  const router = useRouter();
  const fetchData = async () => {
    try {
      let response = await deleteAccount({
        id: userId

      })

      if (response) {
        router.push('/signin')
        return true
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='account-delete-btn'>
      <button onClick={fetchData} className="profile-btn">Delete Account</button>
    </div>
  )
}


export default TagsData

