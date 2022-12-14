import React, { useEffect, useState } from "react";
import style from "./UsersAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, changeRole } from "../../../../redux/actions";
import { ImCross } from "react-icons/im";
import { FaCrown } from "react-icons/fa";
import swal from "sweetalert";

function UsersAdmin() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState({
    email: "",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, email]);

  const users = useSelector((state) => state.allUsers);
  const searchedUsers = useSelector((state) => state.searchedUser);

  async function handleBan(e) {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willBan) => {
      if (willBan) {
        dispatch(changeRole({ id: e.id, order: "ban" }));
        swal("the user has changed successfully!", {
          icon: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        swal("the user remains safe");
      }
    });
  }
  async function handleAdmin(e) {
    swal({
      title: "Are you sure?",
      text: "Once upgraded the user will be able to access the administration panel",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpgrade) => {
      if (willUpgrade) {
        dispatch(changeRole({ id: e.id, order: "admin" }));
        swal("the user has changed successfully!", {
          icon: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        swal("the user remains the same!");
      }
    });
  }

  return (
    <div className={style.container}>
      <div className={style.cardinfo}>
        <p>Id</p>
        <p>Usuario</p>
        <p>Email</p>
      </div>
      {users.map((e) => {
        return (
          <div className={style.card} key={e.id}>
            {e.disable ? (
              <button
                className={style.DelIcon}
                email={e.email}
                onClick={() => handleBan(e)}
              >
                {" "}
                <ImCross className={style.DelIconr} />{" "}
              </button>
            ) : (
              <button
                className={style.DelBtn}
                email={e.email}
                onClick={() => handleBan(e)}
              >
                {" "}
                Ban{" "}
              </button>
            )}
            {e.isAdmin ? (
              <button
                className={style.ModIcon}
                id={e.id}
                onClick={() => handleAdmin(e)}
              >
                {" "}
                <FaCrown className={style.ModIconr} />{" "}
              </button>
            ) : (
              <button
                className={style.ModBtn}
                id={e.id}
                onClick={() => handleAdmin(e)}
              >
                {" "}
                Admin
              </button>
            )}
            <p className={style.element}>{e.id}</p>
            <p className={style.element}>{e.username}</p>
            <p className={style.element}>{e.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default UsersAdmin;
