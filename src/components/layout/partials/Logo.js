import React from "react";
import classNames from "classnames";
import Image from "../../elements/Image";
import Link from "next/link";

const Logo = ({ className, ...props }) => {
  const classes = classNames("brand", className);

  return (
    <Link href="/" legacyBehavior>
    <div {...props} className={classes} style={{ cursor: "pointer",display:'flex',alignItems:'center' }}>
     <div style={{display:'flex',alignItems:'center'}}>
     <Image src={"/images/logo-right.jpg"} alt="Open" width={40} height={40} />
     </div>
    </div>
    </Link>
  );
};

export default Logo;
