import { Box, Typography, CircularProgress } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { CircledCrossIcon } from '../Home2';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/router';
import { ModalContainer } from './SubscribeModal';
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useTheme } from '@mui/material/styles';


const GET_ALL_PACKAGES = gql`
  query GetAllPackages {
    allPackages {
      id
      name
      description
      permissions {
        id
        description
        userFreeLimit
      }
      planSet {
        id
        title
        priceInCoins
        isOnDiscount
        isActive
        dicountedPriceInCoins
        createdAt
        updatedAt
      }
      package {
        id
        package {
          id
          name
          description
        }
        permission {
          id
          description
          userFreeLimit
        }
        perDay
        perWeek
        perMonth
        isUnlimited
      }
      plans {
        id
        title
        priceInCoins
        isOnDiscount
        isActive
        dicountedPriceInCoins
        createdAt
        updatedAt
        package {
          id
          name
          description
        }
      }
    }
  }
`;

const PURCHASE_PACKAGE = gql`
  mutation PurchasePackage($packageId: Int!, $planId: Int!) {
    purchasePackage(packageId: $packageId, planId: $planId) {
      id
      success
    }
  }
`;

const UPGRADE_PACKAGE = gql`
  mutation UpgradePackage($newPackageId: Int!) {
    upgradePackage(newPackageId: $newPackageId) {
      id
      success
      message
    }
  }
`;

const DOWNGRADE_PACKAGE = gql`
  mutation downgradePackage($newPackageId: Int!) {
    downgradePackage(newPackageId: $newPackageId) {
      id
      success
      message
    }
  }
`;

const SILVER = "SILVER";
const GOLD = "GOLD";
const PLATINUM = "PLATINUM";

// const CardBoxes = [
//     {
//         headerBgColor: '#C4D5F6',
//         headerTitle: SILVER,
//     },
//     {
//         headerBgColor: '#E5CE6F',
//         headerTitle: GOLD,

//     },
//     {
//         headerBgColor: '#B58F46',
//         headerTitle: PLATINUM,

//     }
// ]

const HeaderBgColors = {
  [SILVER]: "#C4D5F6",
  [GOLD]: "#E5CE6F",
  [PLATINUM]: "#B58F46",
};

const PricesData = [
  {
    duration: "1",
    orignalPrice: "7.49",
    discount: "50%",
  },
  {
    duration: "1",
    orignalPrice: "7.49",
    discount: "50%",
    discountedPrice: "5.99",
  },
  {
    duration: "1",
    orignalPrice: "7.49",
    discount: "50%",
    discountedPrice: "5.99",
  },
];

// export const ModalContainer = styled(Box)({
//   position: "fixed",
//   inset: 0,
//   backgroundColor: "rgba(0,0,0,0.8)",
//   zIndex: 999,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

const PriceBadges = ({ data, handlePurchase }) => {
  // console.log('data PriceBadges', data);
  return (
    <React.Fragment key={`priceBadges`}>
      {data?.map(({ id, title, priceInCoins, package: packageObj }, index) => (
        <React.Fragment key={`priceBadges-${title}-${index}`}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBlock: "8px",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: "16px", width: "130px" }}
            >
              {title}
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                {priceInCoins}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                i69COINS
              </Typography>
            </Box>
            {/* ==== Commented and replace with buy button for now until discount prices avaiable === */}

            {/* <Box >
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                                    <Typography sx={{ fontWeight: 700, fontSize: '16px', lineHeight: '16px' }}>Save</Typography>
                                    <Typography sx={{ fontWeight: 700, fontSize: '32px', lineHeight: '32px' }}>50%</Typography>
                                </Box>
                                {item.discountedPrice && <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '16px' }}>$50/Month</Typography>}
                            </Box> */}

            <button
              className="global-btn-3 buy-btn"
              style={{ padding: "2px 7px", fontWeight: 500 }}
              onClick={() => {
                handlePurchase(id, packageObj.id);
              }}
            >
              Subscribe
            </button>
          </Box>
          {index !== data.length - 1 && (
            <Box sx={{ width: "100%", borderBottom: "1px solid #ffffff80" }} />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

const BuySubscription = ({
  close,
  currentPackage,
  afterSubscriptionHandler,
  isCallingFromSearch,
  unlock24HoursUsersLoading,
  handleSubscribeFor24Hours
}) => {
  console.log("BuySubscription Opened");
  const [selectedCard, setSelectedCard] = useState(GOLD);
  const router = useRouter();
  const theme = useTheme();
  const [getAllPackages, { data, error, refetch, loading }] =
    useLazyQuery(GET_ALL_PACKAGES);

  useEffect(() => {
    getAllPackages();
  }, []);

  const AllPackages = data?.allPackages?.sort((a, b) => a.id - b.id);
  console.log("AllPackages BuySubscription", AllPackages);

  const [puchasePackage] = useMutation(PURCHASE_PACKAGE);
  const [upgradePackageCall] = useMutation(UPGRADE_PACKAGE);
  const [downgradePackageCall] = useMutation(DOWNGRADE_PACKAGE);

  const Name = (name) => name.split(" ")[0];
  const isActive = ({ name: headerTitle }) =>
    Name(headerTitle) === selectedCard;

  const handlePurchasePackage = async (planId, packageId) => {
    console.log("planId", planId);
    console.log("packageId", packageId);
    try {
      const result = await puchasePackage({
        variables: {
          packageId: packageId,
          planId: planId,
        },
      });
      console.log("result handlePurchasePackage", result);
      afterSubscriptionHandler();
      close();
    } catch (error) {
      console.error("Error handlePurchasePackage", error);
      afterSubscriptionHandler();
      close();
    }
  };
  const upgradePackageHandler = async (planId, packageId) => {
    console.log("planId", planId);
    console.log("packageId", packageId);
    try {
      const result = await upgradePackageCall({
        variables: {
          newPackageId: packageId,
        },
      });
      console.log("result upgradePackageHandler", result);
      close();
      afterSubscriptionHandler();
    } catch (error) {
      console.error("Error upgradePackageHandler", error);
      afterSubscriptionHandler();
      close();
    }
  };

  useEffect(() => {
    if (currentPackage) setSelectedCard(currentPackage.split(" ")[0]);
  }, [currentPackage]);

  return (
    <>
      <ModalContainer>
        <Box
          sx={{
            backgroundImage: "url(/images/texture-01.webp)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "95%",
            width: "75%",
            position: "relative",
            borderRadius: "30px",
            overflow: "hidden",
            opacity: "85%",
          }}
        >
          <CircledCrossIcon
            sx={{
              right: 15,
              top: 15,
              height: "22px !important",
              width: "22px !important",
              background: "transparent",
              color: "#3A3A3A",
              borderColor: "#3A3A3A",
            }}
            onClick={() => {
              close();
              if (!isCallingFromSearch) {
                router.push("my-profile");  
              }
              console.log("BuySubscription Closed");
            }}
          />
          <Typography
            sx={{
              backgroundColor: "#FFD778",
              padding: "10px",
              textAlign: "center",
              color: "#070707",
              fontWeight: 600,
              fontSize: "22px",
            }}
          >
            Buy Subscription
          </Typography>
          {!loading && isCallingFromSearch && (
            <Box className="row m-2 subscription-mobile-view unlock-24hours-wrapper">
              <div class="d-flex justify-content-center">
                <div class="inline-block">
                  Unlock This Function For 24 Hours with 5 Coins
                </div>
                <div class="inline-block">
                  <button
                    disabled={unlock24HoursUsersLoading}
                    className="profile-btn followers-btn ml-3"
                    style={{
                      paddingInline: "10px",
                      fontSize: "16px",
                      margin: "4px 0",
                    }}
                    onClick={handleSubscribeFor24Hours}
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </Box>
          )}
          <div className="row m-0 p-0 subscription-mobile-view">
            {AllPackages?.map((item, idx) => (
              <div
                key={`package-${item.name}-${idx}`}
                className="col-lg-4 col-12 buy-coins-column"
                onClick={() => setSelectedCard(Name(item.name))}
              >
                <Box
                  sx={{
                    padding: `${isActive(item) ? "30px" : "50px"} 4px 12px`,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    className="transparent-black-background buy-coins-card"
                    sx={{
                      height: "auto",
                      padding: 0,
                      fontFamily: "Roboto !important",
                      height: isActive(item) ? "72vh" : "71vh",
                      borderWidth: isActive(item) ? "3px" : "1px",
                      backgroundColor: isActive(item)
                        ? "#0000005C"
                        : "#1f243066",
                      boxShadow: isActive(item) && "1px 4px 21px 5px #000000",
                      cursor: "pointer",
                      [theme.breakpoints.up("md")]: {
                        maxWidth: "372px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px 8px 8px",
                        borderRadius: "10px",
                        backgroundColor: HeaderBgColors[Name(item?.name)],
                        width: isActive(item) ? "101%" : "100px",
                        marginTop: isActive(item) ? "-3px" : 0,
                        borderBottomLeftRadius: isActive(item) ? 0 : "10px",
                        borderBottomRightRadius: isActive(item) ? 0 : "10px",
                      }}
                    >
                      <img src="/images/i69-logo-green-bg.png" alt="logo" />
                      <Typography
                        sx={{
                          color: "#232529",
                          fontWeight: 700,
                          fontSize: "16px",
                          textTransform: "uppercase",
                          textAlign: "center",
                        }}
                      >
                        {item?.name}
                        {/* {Name(item?.name)} */}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        padding: "0 16px 16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: "16px",
                          marginTop: "16px",
                          textAlign: "center",
                        }}
                      >
                        See who likes you
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontWeight: 400,
                          fontSize: "16px",
                          color: "#E5CE6F",
                          textAlign: "center",
                        }}
                      >
                        Maximise your dating with all the benefits of premium,
                        plus extra features included
                      </Typography>

                      <PriceBadges
                        data={item?.plans}
                        handlePurchase={
                          currentPackage
                            ? upgradePackageHandler
                            : handlePurchasePackage
                        }
                      />

                      <button
                        className="profile-btn followers-btn"
                        style={{
                          paddingInline: "10px",
                          fontSize: "16px",
                          margin: isActive(item) ? "12px 0 16px" : "4px 0",
                        }}
                      >
                        <ChevronRightIcon />
                        <span>Compare Price</span>
                      </button>
                      <Box sx={{ color: "#EFCE76", fontSize: "16px" }}>
                        Read Detailed
                        <ChevronRightIcon />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </div>
            ))}
          </div>
        </Box>
      </ModalContainer>
      {unlock24HoursUsersLoading | loading && (
        <Box sx={{ position: "fixed", zIndex: 1000, top: "50%", left: "50%" }}>
          <CircularProgress size="3.5rem" />
        </Box>
      )}
    </>
  );
};

export default BuySubscription;
