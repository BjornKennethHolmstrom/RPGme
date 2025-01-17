type TemplateUpdate = {
  name: string;
  description: string;
  structure: any;
  isPublic: boolean;
};

export async function getTemplate(id: string) {
  const response = await fetch(`/api/templates/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch template');
  }
  return response.json();
}

export async function updateTemplate(id: string, data: TemplateUpdate) {
  const response = await fetch(`/api/templates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update template');
  }
  return response.json();
}

export async function deleteTemplate(id: string) {
  const response = await fetch(`/api/templates/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete template');
  }
}
