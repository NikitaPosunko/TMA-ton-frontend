import { useCallback, useEffect, useState } from "react";
import {
  SendTransactionRequest,
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { Loading } from "../../components/Components";
import { Box, Button, Typography } from "@mui/material";
import { backendAxios } from "../../utils/axiosConfig";
import {
  BACKEND_GET_ACTIVE_ADMIN_CONFIG_REQUEST,
  BACKEND_MAKE_SUBSCRIPTION_REQUEST,
  BACKEND_SUBSCRIPTION_PLANS_REQUEST,
  BACKEND_SUBSCRIPTION_STATUS_REQUEST,
  BACKEND_USER_BALANCE_REQUEST,
  BACKEND_USER_WALLET_CONFIRMATION_REQUEST,
} from "../../static/url";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "../../contexts/useContext";
import { BASE_ROUTE, ERROR_ROUTE } from "../../static/routes";
import { UserBalanceDto } from "../../types/userBalanceResponseType";
import {
  LinkToLoginPage,
  LinkToSubscriberProtectedPage,
  //LinkToSubscriberProtectedPage,
} from "../../components/Links";
import { webApp } from "../../telegram/webApp";
import { getLastPage } from "../../utils/localStorageUtils";

import {
  SubscriptionPlan,
  SubscriptionPlanArray,
} from "../../types/subscriptionPlanType";
import { fromNano } from "../../utils/helperFunctions";
import {
  SubscriptionResponseDto,
  SubscriptionStatus,
} from "../../types/subscriptionStatusType";
import moment from "moment-timezone";
import { UserWalletConfirmationResponseDto } from "../../types/userWalletConfirmationType";
import { AdminConfigResponseDto } from "../../types/adminConfigTypes";

//----------------------------------------------------------------------------------------------//

export const TonConnectPage = () => {
  const [loading, setLoading] = useState(true);
  const [tonConnectUI] = useTonConnectUI();
  const connectedAddress = useTonAddress(true);
  const [userTonBalance, setUserTonBalance] = useState<string | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] =
    useState<SubscriptionPlan | null>(null);

  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionResponseDto | null>(null);

  ///

  //const isAlreadyRendered = useRef(false); // Track the first render

  // error handling
  const navigate = useNavigate();
  const errorContext = useErrorContext();

  const handleError = useCallback(
    (error: { message: string }) => {
      errorContext.setError(error.message);
      console.log(errorContext.errorMessage);
      navigate(ERROR_ROUTE, { replace: true });
    },
    [errorContext, navigate]
  );

  // main part

  // ------------------------------ get user balance ------------------------------ //
  const calculateAndGetUserBalance = async () => {
    setLoading(true);
    try {
      const response = await backendAxios.get(BACKEND_USER_BALANCE_REQUEST);

      const userBalanceDto: UserBalanceDto = response.data;
      const userNanotonBalance = userBalanceDto.nanotonCoinsBalance;

      // convert nanoton to TON
      const userTonBalance = fromNano(userNanotonBalance);
      setUserTonBalance(userTonBalance);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error as { message: string });
    }
  };

  //------------------------------ get subscription status ------------------------------//
  const fetchSubscriptionStatus = useCallback(async (): Promise<
    SubscriptionResponseDto | undefined
  > => {
    setLoading(true);
    try {
      const response = await backendAxios.get(
        BACKEND_SUBSCRIPTION_STATUS_REQUEST
      );
      setSubscriptionStatus(response.data);
      return response.data;
    } catch (error) {
      setLoading(false);
      handleError(error as { message: string });
    }
  }, [handleError]);

  // rendering part

  useEffect(() => {
    const fetchSubscriptionPlan = async () => {
      setLoading(true);
      try {
        const response = await backendAxios.get(
          BACKEND_SUBSCRIPTION_PLANS_REQUEST
        );

        const subscriptionPlanArray: SubscriptionPlanArray = response.data;

        const subscriptionPlan: SubscriptionPlan =
          subscriptionPlanArray.subscriptionPlans[0];
        setSubscriptionPlan(subscriptionPlan);

        //console.log(subscriptionPlan.durationInSeconds);
      } catch (error) {
        setLoading(false);
        handleError(error as { message: string });
      }
    };

    async function fetchAll() {
      await Promise.all([fetchSubscriptionPlan(), fetchSubscriptionStatus()]);
      setLoading(false);
    }

    fetchAll();
  }, [fetchSubscriptionStatus, handleError]);

  //Mini apps buttons setting
  useEffect(() => {
    // ----------------- 1. backend user wallet confirmation ------------------------- //
    // ----------------- 2. get active admin config ---------------------------------- //
    // ----------------- 3. make transaction ----------------------------------------- //
    const doUserConfirmationAndTransaction = async () => {
      try {
        // 1. backend user wallet confirmation
        const userWalletConfirmationResponse = await backendAxios.post(
          BACKEND_USER_WALLET_CONFIRMATION_REQUEST,
          {
            wallet: connectedAddress,
          }
        );
        const userWalletConfirmation: UserWalletConfirmationResponseDto =
          userWalletConfirmationResponse.data;

        // handle response if wallet is already owned by someone
        if (userWalletConfirmation.isWalletOwnedBySomeone) {
          handleError({
            message: "Wallet is owned by another user. Try another wallet.",
          });
          return;
        }

        // 2. get active admin config
        const activeAdminConfigResponse = await backendAxios.get(
          BACKEND_GET_ACTIVE_ADMIN_CONFIG_REQUEST
        );
        const activeAdminConfig: AdminConfigResponseDto =
          activeAdminConfigResponse.data;
        const adminWalletAddress = activeAdminConfig.walletFriendlyAddress;

        // 3. make transaction
        if (subscriptionPlan?.priceInNanotonCoins) {
          const transaction: SendTransactionRequest = {
            messages: [
              {
                address: adminWalletAddress,
                amount: subscriptionPlan.priceInNanotonCoins.toString(), // in nanotons // 20000000 = 0.2 TON
              },
            ],
            // transaction valid for 60 seconds
            validUntil: Math.floor(Date.now() / 1000) + 360,
          };
          const result = await tonConnectUI.sendTransaction(transaction);
          console.log(result);
        } else {
          setLoading(false);
          handleError({ message: "No subscription plan" });
        }
      } catch (error) {
        setLoading(false);
        handleError(error as { message: string });
      }
    };

    // ------------------------------ make subscription ------------------------------ //

    const makeSubscription = async () => {
      try {
        const response = await backendAxios.get(
          BACKEND_MAKE_SUBSCRIPTION_REQUEST
        );
        console.log(response.data);
        setSubscriptionStatus(response.data);
      } catch (error) {
        setLoading(false);
        handleError(error as { message: string });
      }
    };

    // ------------------------------ do full subscription process ------------------------------ //

    const doFullSubscriptionProcess = async () => {
      setLoading(true);
      try {
        // request if user already has subscription
        const response = await fetchSubscriptionStatus();
        if (!response) {
          setLoading(false);
          handleError({ message: "No subscription status" });
        }
        if (response?.status === SubscriptionStatus.ACTIVE) {
          setLoading(false);
          alert("You already have an active subscription");
          return;
        } else {
          // 1. backend user wallet confirmation
          // 2. make transaction
          await doUserConfirmationAndTransaction();

          // 3. make subscription reuqest
          await makeSubscription();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleError(error as { message: string });
      }
    };

    // ------------------------------ main button click ------------------------------ //

    function mainButtonClick() {
      doFullSubscriptionProcess();
      //buySubscription();
    }

    function backButtonClick() {
      const page = getLastPage();
      navigate(page === null ? "/" : page, { replace: true });
    }

    if (webApp !== null) {
      const MainButton = webApp.MainButton;
      const BackButton = webApp.BackButton;

      MainButton.show();
      MainButton.setText("Buy subscription --- Send transaction");
      MainButton.onClick(mainButtonClick);

      BackButton.show();
      BackButton.onClick(backButtonClick);
    }

    return () => {
      webApp?.MainButton.offClick(mainButtonClick);
      webApp?.MainButton.hide();

      webApp?.BackButton.offClick(backButtonClick);
      webApp?.BackButton.hide();
    };
  }, [
    connectedAddress,
    fetchSubscriptionStatus,
    handleError,
    navigate,
    subscriptionPlan,
    tonConnectUI,
  ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page">
      <LinkToLoginPage />
      <br />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TonConnectButton />
      </Box>
      <Button
        variant="outlined"
        sx={{
          mt: 2,
          mb: 2,
          backgroundColor: "var(--tg-theme-section-bg-color)",
          color: "var(--tg-theme-text-color)",
          borderColor: "var(--tg-theme-button-color)",
          p: 2, // Add padding for spacing
          "&:hover": {
            backgroundColor: "var(--tg-theme-secondary-bg-color)",
            borderColor: "var(--tg-theme-link-color)",
            opacity: "0.7",
          },
        }}
        onClick={() => calculateAndGetUserBalance()}
      >
        Get user balance
      </Button>
      {userTonBalance && <Typography>{userTonBalance + " TON"}</Typography>}
      {connectedAddress && (
        <>
          <Typography variant="body1">Wallet: {connectedAddress}</Typography>
          <hr />
          {subscriptionStatus && (
            <>
              <Typography variant="body1">
                Subscription status: {subscriptionStatus.status}
              </Typography>
              {subscriptionStatus.endDate && (
                <p>
                  End date:{" "}
                  {moment(subscriptionStatus.endDate)
                    .tz("Europe/Kiev")
                    .format("YYYY-MM-DD HH:mm:ss")}
                </p>
              )}
            </>
          )}
          <hr />
          {subscriptionPlan && (
            <>
              <Typography variant="body1">
                Subscription plan: {subscriptionPlan.title}
              </Typography>
              <p>{subscriptionPlan.description}</p>
              {/* convert nanoton to TON and round to 2 decimal places */}
              <p>
                {"Price: " +
                  fromNano(subscriptionPlan.priceInNanotonCoins) +
                  " TON"}
              </p>
              <p>
                {"Duration: " +
                  Math.floor(
                    subscriptionPlan.durationInSeconds / 60
                  ).toString() +
                  " min"}
              </p>
            </>
          )}
          {/* <hr />
          <Button
            variant="outlined"
            onClick={() => {
              doFullSubscriptionProcess();
            }}
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "var(--tg-theme-section-bg-color)",
              color: "var(--tg-theme-text-color)",
              borderColor: "var(--tg-theme-button-color)",
              p: 2, // Add padding for spacing
              '&:hover': {
                backgroundColor: "var(--tg-theme-secondary-bg-color)",
                borderColor: "var(--tg-theme-link-color)",
                opacity: "0.7"
              },
            }}
          >
            buy subscription
          </Button> */}
        </>
      )}
      <LinkToSubscriberProtectedPage />
    </div>
  );
};
