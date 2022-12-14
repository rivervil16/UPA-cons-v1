import { createRoutesFromChildren } from "react-router-dom";

const Swal = require("sweetalert2");
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      biblioteca: [],
      raza: [],
      razaIndividual: [],
      favoritos: [],
      razaIndividual2: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/login", opts);
          if (resp.status !== 200) {
            alert("There has been some error");
            return false;
          }

          const data = await resp.json();
          console.log("There has been some error", data);
          localStorage.setItem("token", data.access_token);
          return true;
        } catch (error) {
          console.error("There has been an error login in");
        }
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      signup: (body) => {
        fetch(process.env.BACKEND_URL + "/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((resp) => resp.json())
          .then(() => {
            Swal.fire("Registro exitoso", "Gracias por elegirnos", "success");
            window.location.href = "/login";
            return true;
          });
      },
      reset_password: (body) => {
        fetch(process.env.BACKEND_URL + "/resetpassword", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((resp) => resp.json())
          .then(() => {
            Swal.fire("Registro exitoso", "Gracias por elegirnos", "success");
          });
      },
      loadSomeData: () => {
        fetch(process.env.BACKEND_URL + "/razas_dogs")
          .then((resp) => resp.json())
          .then((resp) => {
            console.log(resp);
            setStore({ biblioteca: resp.Usuarios });
          })
          .catch((err) => console.error(err));
      },

      add_favorito: async (id_user, id_dog) => {
        let user_id = id_user;
        let dog_id = id_dog;
        console.log(user_id);
        console.log(dog_id);
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/add_favorite/" + user_id + "/" + dog_id,
            {
              method: "POST",
              headers: {
                "Content-Type": "aplication/json",
              },
            }
          );
          const data = await resp.json();
          return data;
        } catch (error) {
          console.log("error al agregar Favorito", error);
        }
      },

      loadSomeData: () => {
        fetch(process.env.BACKEND_URL + "/dogs")
          .then((resp) => resp.json())
          .then((resp) => {
            console.log(resp);
            setStore({ raza: resp.Usuarios });
          })
          .catch((err) => console.error(err));
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      informacionIndividualDogs: (id) => {
        fetch(process.env.BACKEND_URL + "/dogs/" + id)
          .then((resp) => resp.json())
          .then((resp) => {
            setStore({ razaIndividual: resp });
            fetch(process.env.BACKEND_URL + "/razas_dogs/" + id)
              .then((resp2) => resp2.json())
              .then((data) => {
                //si todo sabe bien sale la info
                setStore({ razaIndividual2: data });
              });
          })
          .catch((err) => console.error(err));
      },
    },
  };
};

export default getState;
