<script setup>
import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ref, reactive, onMounted } from 'vue';

const { data } = defineProps({
  data: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['editorInstance']);

onMounted(() => {
  DocumentEditor.create(document.querySelector('#editor'), {
    toolbar: {
      items: [
        'Heading',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'alignment',
        '|',
        'indent',
        '|',
        'outdent',
        'numberedList',
        'bulletedList',
        // '|',
        // 'link',
        // 'blockQuote',
        // 'imageUpload',
        // 'insertTable',
        // 'mediaEmbed',
        // '|',
        // 'undo',
        // 'redo',
        // 'CKFinder',
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    heading: {
      options: [
        {
          model: 'heading1',
          view: 'h2',
          title: '階層一',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h3',
          title: '階層二',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h4',
          title: '階層三',
          class: 'ck-heading_heading3',
        },
        { model: 'paragraph', title: '內文', class: 'ck-heading_paragraph' },
      ],
    },
  })
    .then((editor) => {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      emit('editorInstance', editor);
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<template>
  <div id="editor" v-html="data"></div>
</template>

<style lang="scss">
.ck.ck-content ul,
.ck.ck-content ul li {
  list-style-type: inherit;
}

#editor {
  padding: 0 2rem 0.6rem 2rem;
}

#editor {
  @apply text-sm;
}

#editor h2 {
  @apply text-3xl;
}

#editor h3 {
  @apply text-2xl;
}

#editor h4 {
  @apply text-xl;
}

</style>
