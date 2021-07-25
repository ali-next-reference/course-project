// @ts-nocheck
import React from "react";
import Link from "next/link";
import classes from "./button-primary.module.css";

const ButtonPrimary = (props) => {
  if(props.link){
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  return <button onClick={props.onClick} className={classes.btn}>{props.children}</button>
};

export default ButtonPrimary;
