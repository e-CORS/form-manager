<script>
	import FormViewer from '../../components/FormViewer.svelte';
	import { page } from '$app/stores';
	const formId = $page.data.formId;
</script>

<FormViewer {formId} />
