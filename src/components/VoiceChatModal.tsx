import React from 'react';
import { AIChatModal } from './AIChatModal';

interface VoiceChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLab?: (tabId: string) => void;
}

/**
 * Unified Voice & AI Modal
 * Converted to unified mode to deliver seamless voice + chat in one place.
 */
export const VoiceChatModal: React.FC<VoiceChatModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AIChatModal
      isOpen={isOpen}
      onClose={onClose}
      initialMode="voice"
    />
  );
};
