import { useState, useEffect } from "react";
import { Form } from "../utils/types";
import { axiosInstance } from "@/utils/axios";
import { FORM_ROUTES } from "@/constants/routers";

const useSingleForm = (formId: string) => {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getFormById = async (id: string) => {
    setLoading(true)
    const formResponse = await axiosInstance.get(FORM_ROUTES.GET_FORM_BY_ID(id))
    const form = formResponse.data

    setForm({
      ...form,
      sections: JSON.parse(form.sections)
    })

    setLoading(false)
  };

  useEffect(() => {
    if (formId) {
      getFormById(formId as string);
    }
  }, [formId]);

  return { form, loading, error };
};

export default useSingleForm;
