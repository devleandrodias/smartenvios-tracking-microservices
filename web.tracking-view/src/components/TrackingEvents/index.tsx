import { useState } from "react";
import { useForm } from "react-hook-form";
import { Bookmarks, Truck } from "phosphor-react";
import { ToastContainer, toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from "zod";

import styles from "./TrackingEvents.module.css";
import { getTrackingByCode } from "../../services/trackingManagerService";

import "react-toastify/dist/ReactToastify.css";

type Tracking = {
  id: number;
  trackingCode: string;
  events: {
    id: number;
    status: string;
    observation: string;
  }[];
};

type SearchTrackingForm = {
  trackingCode: string;
};

export const TrackingEvent = () => {
  const [tracking, setTracking] = useState<Tracking | null>(null);

  const newSearchTracking = zod.object({
    trackingCode: zod.string().trim().min(1),
  });

  const { register, handleSubmit, reset } = useForm<SearchTrackingForm>({
    resolver: zodResolver(newSearchTracking),
    defaultValues: { trackingCode: "" },
  });

  const handleSearchTracking = async function ({
    trackingCode,
  }: SearchTrackingForm) {
    try {
      const response = await getTrackingByCode(trackingCode);
      setTracking(response);
    } catch (error) {
      toast.error("Código de rastreio não encontrado!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      reset();
    }
  };

  return (
    <div className={styles.todoList}>
      <form onSubmit={handleSubmit(handleSearchTracking)}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Insira o código de rastreio"
            {...register("trackingCode")}
          />
          <button>
            Rastrear
            <Truck />
          </button>
        </div>
      </form>
      {tracking && (
        <div className={styles.taskHeader}>
          <span>
            <span>Eventos encontrados</span>
            <span className={styles.counterTask}>{tracking.events.length}</span>
          </span>
          <span>
            <span>Código de rastreio</span>
            <span className={styles.counterTask}>{tracking.trackingCode}</span>
          </span>
        </div>
      )}
      {tracking?.events ? (
        tracking.events.map(({ id, observation }) => {
          return (
            <div key={id} className={styles.baseCard}>
              <span>{observation}</span>
            </div>
          );
        })
      ) : (
        <div className={styles.blankTable}>
          <Bookmarks size={64} />
          <span className={styles.mainTitle}>
            Ainda não há rastreio disponível
          </span>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
