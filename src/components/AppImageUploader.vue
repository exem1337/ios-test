<template>
  <q-uploader 
    label="Картинка ответа (опционально)"
    send-raw
    ref="uploaderRef"
    @added="onAddImage"
    @removed="onRemoveImage"
    accept=".png, image/*"
    max-files="1"
  />
</template>

<script lang="ts" setup>
import { IAddImage } from 'src/models/test.model';
import { FileService } from 'src/services/file.service';
import { onBeforeMount, ref } from 'vue';

const props = defineProps<{
  file?: string;
  model?: any;
}>();

const emits = defineEmits<{
  (e: 'remove', value: IAddImage): void;
  (e: 'add', value: IAddImage): void;
}>()

const uploaderRef = ref();

async function onAddImage(file: Array<File>) {  
  const salt = await FileService.uploadFile(file);

  emits('add', {
    model: props.model,
    fileKey: salt,
  });
}

function onRemoveImage() {
  emits('remove', {
    model: props.model,
    fileKey: 'NULL',
  });
}

onBeforeMount(async () => {
  if (props.file) {
    const file = await FileService.getFile(props.file);
    uploaderRef.value.addFiles([file]);
  }
  console.log('props.model', props.model)
})
</script>