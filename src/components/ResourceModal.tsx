import React from "react";
import { Resource } from "../reducers/initial-state";
import sentenceCase from "sentence-case";
import { useSelector } from "react-redux";
import { Button, Modal, Skeleton } from "antd";

const ResourceModal = ({
  onRequestClose,
}: {
  onRequestClose:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
}) => {
  const resource = useSelector<{ resource: Resource }, Resource>(
    (state) => state.resource
  );

  const { payload } = resource;

  return (
    <Modal
      bodyStyle={{ minHeight: "300px" }}
      footer={null}
      onCancel={onRequestClose}
      title={
        resource.isLoading ? (
          <Skeleton active className="w-25" paragraph={false} />
        ) : (
          payload.name || payload.title
        )
      }
      visible
      width={800}
    >
      {resource.isLoading && <Skeleton active />}

      {payload &&
        Object.entries(payload).map(([key, value]) => {
          if (
            typeof value !== "string" ||
            ["created", "edited", "url"].indexOf(key) >= 0
          )
            return null;

          return (
            <div className="row" key={key}>
              <div className="col-3">
                <span className="font-weight-bold">{sentenceCase(key)}</span>
              </div>
              <div className="col">
                <span>{sentenceCase(value)}</span>
              </div>
            </div>
          );
        })}

      <Button block className="mt-3" onClick={onRequestClose}>
        {"Close"}
      </Button>
    </Modal>
  );
};

export default ResourceModal;
