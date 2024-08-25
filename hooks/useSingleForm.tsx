import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { FormType } from "../utils/types";
import { getMessage } from "../helpers/getMessage";
import { db } from "@/config/firebase";

const useSingleForm = (formId: string) => {
  const [form, setForm] = useState<FormType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getFormById = async () => {
    try {
      if (!formId) {
        setError("Invalid form ID");
        setLoading(false);
        return;
      }
      const formRef = doc(db, "forms", formId);
      const formSnapshot = await getDoc(formRef);

      if (formSnapshot.exists()) {
        console.log("Form data:", formSnapshot.data());
        const fetchedForm = {
          id: formSnapshot.id,
          form: {
            ...(formSnapshot.data() as Omit<FormType["form"], "id">),
          },
        };
        setForm(fetchedForm);
      } else {
        console.log("Form not found");
        setError("Form not found");
      }
    } catch (err) {
      console.log("Error fetching form:", err);
      setError(getMessage(err));
    } finally {
      console.log("Finished loading");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formId) {
      getFormById();
    }
  }, [formId]);

  return { form, loading, error };
};

export default useSingleForm;
