import { API_BACKEND } from "@env";

import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { datas } from "../utils/sampleDatas";
import { server } from "../remote/server";

import {
  getOrders,
  updateOrderRead,
  updateOrderStatus,
} from "../utils/commonAppNetworkFunctions";
import { UserContext } from "./UserContext";

const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 100;
  const [hasMore, setHasMore] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isNewDatas, setIsNewDatas] = useState(false);
  const [sold, setSold] = useState([]);
  const [bought, setBought] = useState([]);

  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const reshapeOrders = (orders) => {
    const o1 = orders.map((el1) => {
      const o2 = orders.filter((el2) => {
        return (
          el1.products.productDetails.no === el2.products.productDetails.no
        );
      });
      return [...o2];
    });
    console.log({ ...orders, products: o1 });
    return { ...orders, products: o1 };
  };

  const fetchUserOrders = async (user, page, limit) => {
    //console.log("data.orders")
    try {
      const response = await fetch(
        `${server}/api/datas/orders/get/${user._id}?page=${page}&limit=${limit}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }

      return data;
    } catch (error) {
      console.log(error);
      console.log("Get Offers", "Une erreur est survenue! " + error);
      return [];
    }
  };

  const updateOrderRead = async (groupId) => {
    const order = {
      group: groupId,
    };
    //console.log(groupId)

    try {
      const response = await fetch(`${server}/api/datas/orders/update/read`, {
        method: "PUT",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //const datas = await response.json()
      //console.log(datas)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      //console.log(datas)
      return true;
    } catch (error) {
      console.log(error);
      Alert.alert("Erreur", "Une erreur est survenue! " + error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (itemId, productId, status) => {
    //console.log(item)
    const order = {
      product: productId,
      status: status,
    };
    try {
      const response = await fetch(
        `${server}/api/datas/orders/order/update/status/${itemId}`,
        {
          method: "PUT",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //const datas = await response.json()
      //console.log(datas)
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      //console.log(datas)
      return true;
    } catch (error) {
      console.log(error);
      Alert.alert("Erreur", "Une erreur est survenue! " + error);
      return false;
    }
  };

  const getOrders = useCallback(async (user, page, limit) => {
    try {
      setIsLoading(true);
      const newData = await fetchUserOrders(user, page, limit);

      setOrders(newData.orders);
      setSold(newData.sold);
      setBought(newData.bought);
      //console.log(newData)
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    } finally {
      setIsLoading(false);
    }
  }); // [isLoading, hasMore, page])  //pour un rechargements a chaque venue sur la page

  const addNewOrder = async (order) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${server}/api/datas/orders/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`Erreur du serveur: ${response.status}`);
      }

      // Récupère les données de la réponse
      const data = await response.json();
      console.log("Order created successfully:", data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      throw new Error(`Erreur du serveur: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderFromAdmin = async (orderNo) => {
    //console.log(orderNo)
    try {
      const response = await fetch(
        `${server}/api/datas/orders/admin/get/${encodeURIComponent(orderNo)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }

      return data.datas;
    } catch (error) {
      console.log(error);
      console.log("Get Admin Orders", "Une erreur est survenue! " + error);
      return [];
    }
  };

  const updateOrderFromAdmin = async (order, group) => {
    //console.log(orderNo)
    try {
      const response = await fetch(`${server}/api/datas/orders/admin/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order, group }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Mise à jour réussie:", result);
      } else {
        console.error("Erreur lors de la mise à jour:", result);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  const countUnreadNotifications = async (user) => {
    try {
      // Effectuer la requête avec fetch vers l'API
      const response = await fetch(
        `${server}/api/datas/notifications/count/${encodeURIComponent(
          user._id
        )}`,
        {
          method: "GET", // Ou POST si l'API utilise POST
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Convertir la réponse en JSON
      const data = await response.json();

      const unreadCount = data.total || 0;
      setUnreadNotifications(unreadCount);

      console.log(`Nombre de GroupOrders non lus: ${unreadCount}`);
      return unreadCount;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des GroupOrders non lus:",
        error
      );
    }
  };

  const favouritesStateVars = {
    orders,
    sold,
    bought,
    isLoading,
    hasMore,
    page,
    unreadNotifications,
  };
  const favouritesStateStters = {
    setUnreadNotifications,
    setIsLoading,
    setHasMore,
    setPage,
    setOrders,
    setIsNewDatas,
  };
  const utilsFunctions = {
    countUnreadNotifications,
    getOrders,
    getOrderFromAdmin,
    updateOrderFromAdmin,
    updateOrderRead,
    updateOrderStatus,
    addNewOrder,
  };
  return (
    <OrdersContext.Provider
      value={{
        ...favouritesStateVars,
        ...favouritesStateStters,
        ...utilsFunctions,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersContext, OrdersProvider };
