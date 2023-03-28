import { Component } from "vue";

export interface IModalProps {
  component?: Component | string,
  okButtonText?: string,
  cancelButtonText?: string,
  hideFooter?: boolean,
  hideHeader?: boolean,
  headerText?: string,
  hideClose?: boolean;
}