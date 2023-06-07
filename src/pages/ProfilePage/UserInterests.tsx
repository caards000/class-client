import React, {useEffect, useState} from 'react';
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import SetInterests from "../../components/SetInterests";
import {useAppSelector} from "../../redux/hooks";
import interestService from "../../services/interest.service";
import utils from "../../utils/utils";

interface IProps {
}

function UserInterests(props: IProps) {
  const [showModal, setShowModal] = useState(false);
  const interests = useAppSelector(state => state.auth.interests);

  useEffect(() => {
    interestService.getUserInterests()
      .catch((err) => {
        utils.handleRequestError(err);
      })
  }, []);

  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <div>
      <div className="flex gap-5 justify-between">
        <h5>Your Interests</h5>
        <div>
          <Button size="SMALL" variant="PRIMARY" onClick={() => setShowModal(true)}>Update</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 mt-5">
        {
          interests.map((interest, index) => (
            <div key={index} className="border border-slate-200 px-4 py-4 rounded shadow">
              <p className="leading-none">{interest.name}</p>
            </div>
          ))
        }
      </div>

      <Modal isOpen={showModal}>
        <div className="w-96">
          <SetInterests onCancel={closeModal} onSuccessful={closeModal}/>
        </div>
      </Modal>
    </div>
  );
}

export default UserInterests;
