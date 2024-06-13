import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";


type Props = {
  title: string;
  description: string;
 
};

const AlertBox = ({ title, description }: Props) => {
  return (
    <Alert >
  <Terminal className="h-4 w-4" />
  <AlertTitle>{title}</AlertTitle>
  <AlertDescription>
    {description}
  </AlertDescription>
</Alert>

  );
};

export default AlertBox;
